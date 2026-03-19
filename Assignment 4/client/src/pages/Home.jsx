import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CurrentWeatherWidget from '../components/CurrentWeatherWidget';
import FavoritesList from '../components/FavoritesList';
import ForecastLineChart from '../charts/ForecastLineChart';
import MetricsBarChart from '../charts/MetricsBarChart';
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchFavorites,
  addFavorite,
  deleteFavorite,
} from '../services/api';

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Load favorites on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  // Check if current city is already saved
  useEffect(() => {
    if (currentWeather && favorites.length > 0) {
      const saved = favorites.some(
        (f) => f.city.toLowerCase() === currentWeather.name.toLowerCase()
      );
      setIsSaved(saved);
    } else {
      setIsSaved(false);
    }
  }, [currentWeather, favorites]);

  const loadFavorites = async () => {
    try {
      const res = await fetchFavorites();
      setFavorites(res.data);
    } catch (err) {
      console.error('Failed to load favorites:', err);
    }
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    setCurrentWeather(null);
    setForecast(null);

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setCurrentWeather(weatherRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCity = async () => {
    if (!currentWeather) return;
    try {
      await addFavorite({
        city: currentWeather.name,
        country: currentWeather.sys.country,
        lat: currentWeather.coord.lat,
        lon: currentWeather.coord.lon,
      });
      setIsSaved(true);
      await loadFavorites();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save city.';
      setError(msg);
    }
  };

  const handleDeleteFavorite = async (id) => {
    try {
      await deleteFavorite(id);
      await loadFavorites();
    } catch (err) {
      setError('Failed to remove city from favorites.');
    }
  };

  const handleSelectFavorite = (city) => {
    handleSearch(city);
  };

  return (
    <div className="home-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <FavoritesList
          favorites={favorites}
          onSelect={handleSelectFavorite}
          onDelete={handleDeleteFavorite}
        />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">Real-Time Weather Dashboard</h1>
          <p className="hero-subtitle">
            Search for any city worldwide to get live weather data and 5-day forecasts.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error Alert */}
        {error && (
          <div className="error-alert" role="alert" id="error-alert">
            ⚠️ {error}
            <button className="close-alert" onClick={() => setError('')}>✕</button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="loading-container" id="loading-spinner">
            <div className="spinner" />
            <p className="loading-text">Fetching weather data...</p>
          </div>
        )}

        {/* Weather Data */}
        {!loading && currentWeather && (
          <div className="dashboard-grid">
            <CurrentWeatherWidget
              data={currentWeather}
              onSave={handleSaveCity}
              isSaved={isSaved}
            />

            {forecast && (
              <>
                <ForecastLineChart forecastData={forecast} />
                <MetricsBarChart forecastData={forecast} />
              </>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !currentWeather && !error && (
          <div className="empty-state">
            <div className="empty-icon">🌍</div>
            <h3>Search for a City</h3>
            <p>Enter a city name above to view real-time weather data and forecasts.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
