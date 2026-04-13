import React from 'react';

const FavoritesList = ({ favorites, onSelect, onDelete }) => {
  return (
    <div className="favorites-sidebar">
      <div className="sidebar-title">
        ⭐ Favorites
        {favorites.length > 0 && (
          <span className="sidebar-badge">{favorites.length}</span>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="no-favorites">
          No saved cities yet.<br />
          Search and save cities to see them here.
        </p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((fav) => (
            <li key={fav._id} className="favorite-item">
              <button
                className="fav-city-btn"
                onClick={() => onSelect(fav.city)}
                title={`Load weather for ${fav.city}`}
              >
                <span className="fav-city-name">{fav.city}</span>
                <span className="fav-country">{fav.country}</span>
              </button>
              <button
                className="fav-delete-btn"
                onClick={() => onDelete(fav._id)}
                title={`Remove ${fav.city}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
