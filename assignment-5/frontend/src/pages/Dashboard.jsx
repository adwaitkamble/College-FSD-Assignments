import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, CheckCircle, Shield, X as CloseIcon } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [purchasedPolicies, setPurchasedPolicies] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    } else {
      navigate('/login');
    }

    // Checking for payment success via generic search
    if (window.location.search.includes('payment_success=true')) {
      setShowPopup(true);
      // Clean up URL so refresh doesn't trigger it again
      window.history.replaceState({}, '', '/dashboard');
    }

    // Load custom array of purchased items
    const saved = JSON.parse(localStorage.getItem('purchasedPolicies')) || [];
    setPurchasedPolicies(saved);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="container" style={{ padding: '2rem 0', position: 'relative' }}>
      
      {/* MASSIVE POPUP BANNER */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            style={{ 
              position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)', 
              background: '#ffffff', color: '#166534', padding: '2rem 3rem', borderRadius: '16px', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '1.5rem', 
              border: '3px solid #4ade80', width: '90%', maxWidth: '600px'
            }}
          >
            <CheckCircle size={50} color="#22c55e" />
            <div style={{ flexGrow: 1 }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#15803d' }}>Payment Successful!</h2>
              <p style={{ fontSize: '1.1rem', color: '#166534' }}>Your policies are now active.</p>
            </div>
            <button onClick={() => setShowPopup(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#166534' }}>
              <CloseIcon size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="section-title">Client Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '3rem' }}>
        
        {/* Profile Info */}
        <motion.div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <UserCircle size={80} color="var(--accent-green)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{user.name}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{user.email}</p>
          <div style={{ borderTop: '1px solid rgba(136, 169, 124, 0.2)', paddingTop: '1.5rem' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Account ID: {user._id}</p>
          </div>
        </motion.div>

        {/* Account Details / Mock Data */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div className="glass-panel" style={{ padding: '2rem' }} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Active Policies Vault</h3>
            
            {purchasedPolicies.length > 0 ? (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {purchasedPolicies.map((policy, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: '12px', border: '1px solid rgba(136,169,124,0.3)' }}>
                    <Shield size={32} color="var(--accent-green)" />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{policy.title}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status: <span style={{ color: '#16a34a', fontWeight: 'bold' }}>Active</span> &bull; Premium: ₹{policy.price.toLocaleString()}/yr</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>You currently have no active policies. Visit the Services page to get a quote.</p>
            )}
          </motion.div>
          
          <motion.div className="glass-panel" style={{ padding: '2rem' }} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Recent Inquiries</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Your recent quotes and contact inquiries will appear here.</p>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
