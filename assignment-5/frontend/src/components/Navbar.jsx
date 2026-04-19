import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, LogOut, ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1000, background: 'rgba(255,255,255,0.9)', borderBottom: '1px solid rgba(136, 169, 124, 0.2)', backdropFilter: 'blur(8px)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          <Leaf color="var(--accent-green)" size={28} />
          Divine Insurance
        </Link>
        
        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
          <Link to="/" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Home</Link>
          <Link to="/about" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>About</Link>
          <Link to="/services" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Services</Link>
          <Link to="/contact" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Contact</Link>
          
          <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={24} color="var(--text-primary)" />
            {cartItems.length > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-10px', background: 'var(--accent-green)', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '50%' }}>
                {cartItems.length}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link to="/dashboard" style={{ fontWeight: 600, color: 'var(--accent-green)' }}>Dashboard</Link>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#dc2626', fontWeight: 500 }}>
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" className="secondary-btn">Login</Link>
              <Link to="/register" className="primary-btn">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
