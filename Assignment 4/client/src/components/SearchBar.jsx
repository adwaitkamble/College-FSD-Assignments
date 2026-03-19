import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a city... (e.g. Mumbai, London, Tokyo)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          aria-label="Search city"
          id="city-search-input"
        />
        <button
          type="submit"
          className="search-btn"
          disabled={loading || !query.trim()}
          id="city-search-btn"
        >
          {loading ? <span className="spinner-small" /> : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
