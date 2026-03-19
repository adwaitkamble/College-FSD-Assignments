const FavoriteCity = require('../models/FavoriteCity');

// @desc   Get all favorite cities
// @route  GET /api/favorites
const getFavorites = async (req, res) => {
  try {
    const favorites = await FavoriteCity.find().sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch favorites', error: error.message });
  }
};

// @desc   Add a city to favorites
// @route  POST /api/favorites
const addFavorite = async (req, res) => {
  const { city, country, lat, lon } = req.body;
  if (!city) {
    return res.status(400).json({ message: 'City name is required' });
  }
  try {
    // Check if city already exists
    const existing = await FavoriteCity.findOne({ city: { $regex: new RegExp(`^${city}$`, 'i') } });
    if (existing) {
      return res.status(409).json({ message: `${city} is already in your favorites!` });
    }
    const newFavorite = await FavoriteCity.create({ city, country, lat, lon });
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add favorite', error: error.message });
  }
};

// @desc   Delete a city from favorites
// @route  DELETE /api/favorites/:id
const deleteFavorite = async (req, res) => {
  try {
    const favorite = await FavoriteCity.findById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite city not found' });
    }
    await FavoriteCity.findByIdAndDelete(req.params.id);
    res.json({ message: `${favorite.city} removed from favorites` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete favorite', error: error.message });
  }
};

module.exports = { getFavorites, addFavorite, deleteFavorite };
