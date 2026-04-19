import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '4rem 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1.2, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Secure Your Future with <span style={{ color: 'var(--accent-green)' }}>Divine Insurance</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Empowering you to live life fully while we protect what matters most. Rooted in trust, growing with care.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/services" className="primary-btn">Explore Policies</Link>
              <Link to="/contact" className="secondary-btn">Contact Agent</Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-panel"
            style={{ padding: '1rem' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1576267423048-15c0040fec78?q=80&w=2000&auto=format&fit=crop" 
              alt="Family in nature" 
              style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', height: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
            />
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }} whileHover={{ y: -5 }}>
              <ShieldCheck size={48} color="var(--accent-green)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Unshakeable Security</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Rock-solid coverage ensuring your assets and loved ones are completely protected.</p>
            </motion.div>
            
            <motion.div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }} whileHover={{ y: -5 }}>
              <Leaf size={48} color="var(--accent-green)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Natural Growth</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Our investment-linked policies grow organically over time to secure your retirement.</p>
            </motion.div>

            <motion.div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }} whileHover={{ y: -5 }}>
              <HeartHandshake size={48} color="var(--accent-green)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Trusted Partnership</h3>
              <p style={{ color: 'var(--text-secondary)' }}>We don't just sell policies; we build lasting, transparent relationships for life.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
