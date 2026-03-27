const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 100
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Car', 'Bike', 'Scooter', 'Truck', 'Bus', 'Other'],
    default: 'Car'
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: 1980,
    max: new Date().getFullYear()
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  km_driven: {
    type: Number,
    required: [true, 'KM driven is required'],
    min: 0
  },
  fuel_type: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'CNG', 'Hybrid'],
    default: 'Petrol'
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic'],
    default: 'Manual'
  },
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor'],
    default: 'Good'
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  images: [{
    type: String // file paths for uploaded images
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available'
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Text search index
listingSchema.index({ title: 'text', brand: 'text', model: 'text', description: 'text' });

module.exports = mongoose.model('Listing', listingSchema);
