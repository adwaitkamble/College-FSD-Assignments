const mongoose = require('mongoose');

const FavoriteCitySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FavoriteCity', FavoriteCitySchema);
