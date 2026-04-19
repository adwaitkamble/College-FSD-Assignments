import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    // Simply route to our custom mock payment gateway
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Explore our Services page to find the perfect insurance policy for you.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 className="section-title">Checkout Cart</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>
        
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cartItems.map((item) => (
            <motion.div 
              key={item.id} 
              className="glass-panel" 
              style={{ display: 'flex', alignItems: 'center', padding: '1.5rem', gap: '2rem' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            >
              <img src={item.image} alt={item.title} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Annual Premium</p>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>₹{item.price.toLocaleString()}</div>
              <button onClick={() => removeFromCart(item.id)} style={{ background: '#fee2e2', border: 'none', padding: '0.75rem', borderRadius: '50%', color: '#dc2626', cursor: 'pointer' }}>
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(136,169,124,0.2)', paddingBottom: '1rem' }}>Order Summary</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            <span>Subtotal</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            <span>Platform Fee</span>
            <span>₹0.00</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <button 
            className="primary-btn" 
            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}
            onClick={handleCheckout}
          >
            Proceed to Payment
            <ShieldCheck size={20} />
          </button>
          
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1rem' }}>
            Fully secured mock transaction flow.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Cart;
