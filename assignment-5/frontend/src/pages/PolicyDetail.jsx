import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { policiesData } from './Services';
import { CartContext } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PolicyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useContext(CartContext);

  const policy = policiesData.find(p => p.id === id);

  if (!policy) {
    return <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}>Policy Not Found</div>;
  }

  const isAdded = cartItems.find(item => item.id === policy.id);

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--accent-green)', fontWeight: 600, cursor: 'pointer', marginBottom: '2rem' }}>
        &larr; Back to Services
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '4rem', alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <img 
            src={policy.image} 
            alt={policy.title} 
            style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
          <span style={{ background: 'var(--surface-alt)', color: 'var(--text-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>Premium Coverage</span>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '1rem' }}>{policy.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
            {policy.description}
          </p>

          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(136, 169, 124, 0.2)', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Estimated Annual Premium</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{policy.price.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-secondary)' }}>/ year</span></p>
          </div>

          {isAdded ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-green)', fontWeight: 600, fontSize: '1.2rem' }}>
              <CheckCircle size={28} /> Added to Cart
            </div>
          ) : (
            <button 
              className="primary-btn" 
              onClick={() => addToCart(policy)}
              style={{ padding: '1rem 3rem', fontSize: '1.1rem', width: '100%' }}
            >
              Add to Cart
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PolicyDetail;
