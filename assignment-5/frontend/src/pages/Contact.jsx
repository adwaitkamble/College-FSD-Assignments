import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const branches = [
    { city: "Pune (PCMC)", address: "Ganga Builders office no. 2, near Aditya Birla Hospital" },
    { city: "Mumbai", address: "Bandra Kurla Complex, Tower B, 14th Floor" },
    { city: "Delhi", address: "Connaught Place, Regal Building, 1st Floor" },
    { city: "Bangalore", address: "UB City, Vittal Mallya Road, 5th Block" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/inquiries/contact`, formData);
      setStatus('Message sent successfully! Excel sheet updated.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('Failed to send message.');
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 className="section-title">Contact Us</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '4rem' }}>
        
        {/* Branches Grid */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Our Presence</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {branches.map((branch, index) => (
              <motion.div 
                key={index} 
                className="glass-panel" 
                style={{ padding: '1.5rem' }}
                whileHover={{ x: 5 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <MapPin color="var(--accent-green)" size={20} />
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{branch.city}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: '1.75rem' }}>{branch.address}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <motion.div 
          className="glass-panel" 
          style={{ padding: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Send us a message</h2>
          {status && <div style={{ marginBottom: '1rem', padding: '1rem', background: '#e0f2fe', color: '#0369a1', borderRadius: '8px' }}>{status}</div>}
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  required 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                value={formData.subject} 
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea 
                className="form-input" 
                rows="5" 
                required 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            
            <button type="submit" className="primary-btn" style={{ width: '100%' }}>Send Message</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
