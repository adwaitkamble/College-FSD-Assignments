import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ShieldCheck, CreditCard, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      // Save items to user's purchased portfolio
      const existing = JSON.parse(localStorage.getItem('purchasedPolicies')) || [];
      const updated = [...existing, ...cartItems];
      localStorage.setItem('purchasedPolicies', JSON.stringify(updated));

      setLoading(false);
      clearCart(); // Empty the cart on success
      navigate('/dashboard?payment_success=true');
    }, 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', marginBottom: '2rem' }}>
        &larr; Back to Cart
      </button>

      <h1 className="section-title" style={{ marginBottom: '1rem' }}>Secure Payment Gateway</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        <Lock size={16} style={{ display: 'inline', marginBottom: '-2px' }} /> This is a mock payment interface. No real transactions occur.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr)', gap: '2rem' }}>
        <motion.div 
          className="glass-panel" 
          style={{ padding: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(136, 169, 124, 0.2)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Payment Details</h2>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-green)' }}>Total: ₹{total.toLocaleString()}</h2>
          </div>

          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label className="form-label">Name on Card</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Adwait Kamble" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Card Number</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="xxxx xxxx xxxx xxxx"
                  maxLength="16"
                  required 
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <CreditCard size={20} color="var(--text-secondary)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label className="form-label">Expiry Date</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="MM/YY" 
                  maxLength="5"
                  required 
                  value={formData.expiry}
                  onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">CVV</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="***" 
                  maxLength="3"
                  required 
                  value={formData.cvv}
                  onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="primary-btn" 
              style={{ width: '100%', fontSize: '1.2rem', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
              disabled={loading}
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>Pay ₹{total.toLocaleString()} Securely <ShieldCheck size={24} /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
