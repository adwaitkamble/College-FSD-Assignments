import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// ─── Weather ───────────────────────────────────────────────────────────────────

export const fetchCurrentWeather = (city) =>
  API.get(`/weather/current`, { params: { city } });

export const fetchForecast = (city) =>
  API.get(`/weather/forecast`, { params: { city } });

// ─── Favorites ─────────────────────────────────────────────────────────────────

export const fetchFavorites = () => API.get('/favorites');

export const addFavorite = (cityData) => API.post('/favorites', cityData);

export const deleteFavorite = (id) => API.delete(`/favorites/${id}`);

export default API;
