const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Listing = require('../models/Listing');
const authMiddleware = require('../middleware/auth');

// --- Multer Setup for Image Uploads ---
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'));
  }
});

// @route   GET /api/listings
// @desc    Get all listings with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, fuel_type, transmission, search, page = 1, limit = 12 } = req.query;
    const filter = { status: 'available' };

    if (category) filter.category = category;
    if (fuel_type) filter.fuel_type = fuel_type;
    if (transmission) filter.transmission = transmission;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      const regex = { $regex: search, $options: 'i' };
      filter.$or = [
        { title: regex },
        { brand: regex },
        { model: regex },
        { location: regex },
        { description: regex }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Listing.countDocuments(filter);
    const listings = await Listing.find(filter)
      .populate('seller', 'name phone location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ listings, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   GET /api/listings/:id
// @desc    Get a single listing by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('seller', 'name email phone location');
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    
    listing.views += 1;
    await listing.save();

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   POST /api/listings
// @desc    Create a new listing
// @access  Private
router.post('/', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const { title, category, brand, model, year, price, km_driven, fuel_type, transmission, condition, description, location } = req.body;
    const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

    const listing = await Listing.create({
      title, category, brand, model, year: Number(year), price: Number(price),
      km_driven: Number(km_driven), fuel_type, transmission, condition,
      description, location, images, seller: req.user._id
    });

    res.status(201).json({ message: 'Listing created successfully!', listing });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   PUT /api/listings/:id
// @desc    Update a listing (only by the owner)
// @access  Private
router.put('/:id', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to edit this listing.' });
    }

    const { title, category, brand, model, year, price, km_driven, fuel_type, transmission, condition, description, location, status } = req.body;
    const newImages = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

    if (title) listing.title = title;
    if (category) listing.category = category;
    if (brand) listing.brand = brand;
    if (model) listing.model = model;
    if (year) listing.year = Number(year);
    if (price) listing.price = Number(price);
    if (km_driven) listing.km_driven = Number(km_driven);
    if (fuel_type) listing.fuel_type = fuel_type;
    if (transmission) listing.transmission = transmission;
    if (condition) listing.condition = condition;
    if (description) listing.description = description;
    if (location) listing.location = location;
    if (status) listing.status = status;
    if (newImages.length > 0) listing.images = [...listing.images, ...newImages];

    await listing.save();
    res.json({ message: 'Listing updated successfully!', listing });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   DELETE /api/listings/:id
// @desc    Delete a listing (only by the owner)
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this listing.' });
    }

    // Clean up uploaded images
    listing.images.forEach(imgPath => {
      const fullPath = path.join(__dirname, '..', imgPath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    });

    await listing.deleteOne();
    res.json({ message: 'Listing deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   GET /api/listings/my/listings
// @desc    Get listings by the logged-in user
// @access  Private
router.get('/my/listings', authMiddleware, async (req, res) => {
  try {
    const listings = await Listing.find({ seller: req.user._id }).sort({ createdAt: -1 });
    res.json({ listings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
