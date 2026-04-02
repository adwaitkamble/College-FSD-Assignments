const FavoriteCity = require('../models/FavoriteCity');
const favoriteStore = require('../utils/favoriteStore');

const isMongoReady = () => FavoriteCity.db.readyState === 1;

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// @desc   Get all favorite cities
// @route  GET /api/favorites
const getFavorites = async (req, res) => {
  try {
    const favorites = isMongoReady()
      ? await FavoriteCity.find().sort({ createdAt: -1 })
      : await favoriteStore.getAllFavorites();

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch favorites', error: error.message });
  }
};

// @desc   Add a city to favorites
// @route  POST /api/favorites
const addFavorite = async (req, res) => {
  const { city, country, lat, lon } = req.body;
  const trimmedCity = city?.trim();

  if (!trimmedCity) {
    return res.status(400).json({ message: 'City name is required' });
  }

  try {
    const existing = isMongoReady()
      ? await FavoriteCity.findOne({
          city: { $regex: new RegExp(`^${escapeRegex(trimmedCity)}$`, 'i') },
        })
      : await favoriteStore.findFavoriteByCity(trimmedCity);

    if (existing) {
      return res.status(409).json({ message: `${trimmedCity} is already in your favorites!` });
    }

    const newFavorite = isMongoReady()
      ? await FavoriteCity.create({ city: trimmedCity, country, lat, lon })
      : await favoriteStore.addFavorite({ city: trimmedCity, country, lat, lon });

    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add favorite', error: error.message });
  }
};

// @desc   Delete a city from favorites
// @route  DELETE /api/favorites/:id
const deleteFavorite = async (req, res) => {
  try {
    const favorite = isMongoReady()
      ? await FavoriteCity.findById(req.params.id)
      : await favoriteStore.deleteFavorite(req.params.id);

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite city not found' });
    }

    if (isMongoReady()) {
      await FavoriteCity.findByIdAndDelete(req.params.id);
    }

    res.json({ message: `${favorite.city} removed from favorites` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete favorite', error: error.message });
  }
};

module.exports = { getFavorites, addFavorite, deleteFavorite };
