const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast } = require('../controllers/weatherController');

// GET /api/weather/current?city=London
router.get('/current', getCurrentWeather);

// GET /api/weather/forecast?city=London
router.get('/forecast', getForecast);

module.exports = router;
