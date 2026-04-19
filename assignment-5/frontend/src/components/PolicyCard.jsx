import React from 'react';
import { motion } from 'framer-motion';

const PolicyCard = ({ title, description, icon: Icon, image, onGetQuote }) => {
  return (
    <motion.div 
      className="glass-panel"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ height: '200px', width: '100%', position: 'relative' }}>
        <img 
          src={image} 
          alt={title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', padding: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Icon size={24} color="var(--accent-green)" />
        </div>
      </div>
      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>{description}</p>
        <button onClick={() => onGetQuote(title)} className="secondary-btn" style={{ width: '100%' }}>
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default PolicyCard;
