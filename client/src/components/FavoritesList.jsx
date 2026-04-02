import React from 'react';
import { fetchFavorites, deleteFavorite } from '../services/api';

const FavoritesList = ({ favorites, onSelect, onDelete }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-sidebar">
        <h3 className="sidebar-title">⭐ Saved Cities</h3>
        <p className="no-favorites">No saved cities yet. Search and save cities to see them here!</p>
      </div>
    );
  }

  return (
    <div className="favorites-sidebar">
      <h3 className="sidebar-title">⭐ Saved Cities</h3>
      <ul className="favorites-list">
        {favorites.map((fav) => (
          <li key={fav._id} className="favorite-item">
            <button
              className="fav-city-btn"
              onClick={() => onSelect(fav.city)}
              id={`fav-${fav._id}`}
            >
              <span className="fav-city-name">{fav.city}</span>
              {fav.country && (
                <span className="fav-country">{fav.country}</span>
              )}
            </button>
            <button
              className="fav-delete-btn"
              onClick={() => onDelete(fav._id)}
              title={`Remove ${fav.city}`}
              id={`del-${fav._id}`}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
