import React from 'react';

const CurrentWeatherWidget = ({ data, onSave, isSaved }) => {
  if (!data) return null;

  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed },
    visibility,
    dt,
  } = data;

  const icon = weather[0].icon;
  const description = weather[0].description;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const date = new Date(dt * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="weather-widget">
      {/* Currently Observing badge */}
      <div className="observing-badge">
        <span className="observing-dot" />
        Currently Observing
      </div>

      <div className="widget-header">
        {/* Left: City info */}
        <div className="city-info">
          <h2 className="city-name">
            {name}, <span className="country-code">{country}</span>
          </h2>
          <p className="weather-date">{date}</p>
          <p className="weather-desc">{description}</p>
        </div>

        {/* Right: Icon + Temperature – editorial asymmetry */}
        <div className="weather-icon-temp">
          <img src={iconUrl} alt={description} className="weather-icon" />
          <span className="main-temp">{Math.round(temp)}°C</span>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-icon">🌡️</span>
          <p className="metric-label">Feels Like</p>
          <p className="metric-value">{Math.round(feels_like)}°C</p>
        </div>
        <div className="metric-card">
          <span className="metric-icon">💧</span>
          <p className="metric-label">Humidity</p>
          <p className="metric-value">{humidity}%</p>
        </div>
        <div className="metric-card">
          <span className="metric-icon">💨</span>
          <p className="metric-label">Wind Speed</p>
          <p className="metric-value">{speed} m/s</p>
        </div>
        <div className="metric-card">
          <span className="metric-icon">⬆️</span>
          <p className="metric-label">Pressure</p>
          <p className="metric-value">{pressure} hPa</p>
        </div>
        <div className="metric-card">
          <span className="metric-icon">👁️</span>
          <p className="metric-label">Visibility</p>
          <p className="metric-value">{(visibility / 1000).toFixed(1)} km</p>
        </div>
      </div>

      {/* Save button */}
      <button
        className={`save-btn ${isSaved ? 'saved' : ''}`}
        onClick={onSave}
        disabled={isSaved}
        id="save-city-btn"
      >
        {isSaved ? '⭐ Saved!' : '☆ Save City'}
      </button>
    </div>
  );
};

export default CurrentWeatherWidget;
