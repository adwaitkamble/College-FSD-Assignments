import React, { useState, useEffect } from 'react';
import FavoritesList from '../components/FavoritesList';
import CurrentWeatherWidget from '../components/CurrentWeatherWidget';
import ForecastLineChart from '../charts/ForecastLineChart';
import MetricsBarChart from '../charts/MetricsBarChart';
import {
  fetchFavorites,
  fetchCurrentWeather,
  fetchForecast,
  deleteFavorite,
  addFavorite,
} from '../services/api';

const SavedDashboards = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const res = await fetchFavorites();
      setFavorites(res.data);
    } catch (err) {
      setError('Failed to load saved cities.');
    }
  };

  const handleSelectCity = async (city) => {
    setLoading(true);
    setError('');
    setSelectedWeather(null);
    setSelectedForecast(null);

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setSelectedWeather(weatherRes.data);
      setSelectedForecast(forecastRes.data);
      setIsSaved(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load weather for this city.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFavorite = async (id) => {
    try {
      await deleteFavorite(id);
      await loadFavorites();
      // If deleted city was selected, clear it
      setSelectedWeather(null);
      setSelectedForecast(null);
    } catch (err) {
      setError('Failed to remove city.');
    }
  };

  return (
    <div className="home-layout">
      <aside className="sidebar">
        <FavoritesList
          favorites={favorites}
          onSelect={handleSelectCity}
          onDelete={handleDeleteFavorite}
        />
      </aside>

      <main className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">⭐ Saved Cities Dashboard</h1>
          <p className="hero-subtitle">
            Click on any saved city to load its weather data and forecasts.
          </p>
        </div>

        {error && (
          <div className="error-alert" role="alert">
            ⚠️ {error}
            <button className="close-alert" onClick={() => setError('')}>✕</button>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="spinner" />
            <p className="loading-text">Loading weather data...</p>
          </div>
        )}

        {!loading && selectedWeather && (
          <div className="dashboard-grid">
            <CurrentWeatherWidget
              data={selectedWeather}
              onSave={() => {}}
              isSaved={isSaved}
            />
            {selectedForecast && (
              <>
                <ForecastLineChart forecastData={selectedForecast} />
                <MetricsBarChart forecastData={selectedForecast} />
              </>
            )}
          </div>
        )}

        {!loading && !selectedWeather && !error && favorites.length > 0 && (
          <div className="empty-state">
            <div className="empty-icon">👆</div>
            <h3>Select a City</h3>
            <p>Click any city in the sidebar to view its weather dashboard.</p>
          </div>
        )}

        {!loading && !selectedWeather && !error && favorites.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">⭐</div>
            <h3>No Saved Cities</h3>
            <p>Go to the Home page, search for a city, and save it to see it here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedDashboards;
