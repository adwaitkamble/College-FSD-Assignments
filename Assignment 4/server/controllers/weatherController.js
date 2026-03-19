const axios = require('axios');

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// @desc   Get current weather for a city
// @route  GET /api/weather/current?city=London
const getCurrentWeather = async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ message: 'City name is required' });
  }
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'City not found. Please check the city name.' });
    }
    res.status(500).json({ message: 'Failed to fetch weather data', error: error.message });
  }
};

// @desc   Get 5-day / 3-hour forecast for a city
// @route  GET /api/weather/forecast?city=London
const getForecast = async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ message: 'City name is required' });
  }
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'City not found. Please check the city name.' });
    }
    res.status(500).json({ message: 'Failed to fetch forecast data', error: error.message });
  }
};

module.exports = { getCurrentWeather, getForecast };
