import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🌤️</span>
        <span className="navbar-title">AeroDash</span>
      </div>
      <ul className="navbar-links">
        <li>
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            🏠 Home
          </Link>
        </li>
        <li>
          <Link
            to="/saved"
            className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}
          >
            ⭐ Saved Cities
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
