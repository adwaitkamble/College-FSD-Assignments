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
} from '../services/api';

const SavedDashboards = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(true);
  const [activeCity, setActiveCity] = useState('');

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
    setActiveCity(city);

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
      setSelectedWeather(null);
      setSelectedForecast(null);
      setActiveCity('');
    } catch (err) {
      setError('Failed to remove city.');
    }
  };

  return (
    <div className="home-layout">
      {/* Sidebar with active city highlighting */}
      <aside className="sidebar">
        <div className="favorites-sidebar">
          <div className="sidebar-title">
            ⭐ Saved Cities
            {favorites.length > 0 && (
              <span className="sidebar-badge">{favorites.length}</span>
            )}
          </div>

          {favorites.length === 0 ? (
            <p className="no-favorites">
              No saved cities yet.<br />
              Go to Home, search &amp; save a city.
            </p>
          ) : (
            <ul className="favorites-list">
              {favorites.map((fav) => (
                <li key={fav._id} className="favorite-item">
                  <button
                    className={`fav-city-btn ${activeCity === fav.city ? 'active-city' : ''}`}
                    onClick={() => handleSelectCity(fav.city)}
                    title={`View weather for ${fav.city}`}
                  >
                    <span className="fav-city-name">{fav.city}</span>
                    <span className="fav-country">{fav.country}</span>
                  </button>
                  <button
                    className="fav-delete-btn"
                    onClick={() => handleDeleteFavorite(fav._id)}
                    title={`Remove ${fav.city}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero */}
        <div className="hero-section">
          <span className="hero-label">Priority Monitoring</span>
          <h1 className="hero-title">⭐ Saved Cities Dashboard</h1>
          <p className="hero-subtitle">
            Click on any saved city to load its weather data and forecasts.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="error-alert" role="alert">
            ⚠️ {error}
            <button className="close-alert" onClick={() => setError('')}>✕</button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading-container">
            <div className="spinner" />
            <p className="loading-text">Loading atmospheric data…</p>
          </div>
        )}

        {/* Weather data */}
        {!loading && selectedWeather && (
          <div className="dashboard-grid">
            <CurrentWeatherWidget
              data={selectedWeather}
              onSave={() => {}}
              isSaved={isSaved}
            />
            {selectedForecast && (
              <div className="charts-row">
                <ForecastLineChart forecastData={selectedForecast} />
                <MetricsBarChart forecastData={selectedForecast} />
              </div>
            )}
          </div>
        )}

        {/* Select city prompt */}
        {!loading && !selectedWeather && !error && favorites.length > 0 && (
          <div className="empty-state">
            <div className="empty-icon">👆</div>
            <h3>Select a City</h3>
            <p>Click any city in the sidebar to view its weather dashboard.</p>
          </div>
        )}

        {/* No saved cities */}
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
