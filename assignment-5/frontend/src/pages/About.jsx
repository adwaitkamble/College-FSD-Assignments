import React from 'react';
import { motion } from 'framer-motion';
import ownerImg from '../assets/adwait photo.jpg';

const About = () => {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 className="section-title">About Us</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel"
          style={{ padding: '1rem' }}
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
            alt="Corporate Office"
            style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Our Vision</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            At Divine Insurance, our vision is to cultivate a secure future for individuals, families, and businesses by integrating natural sustainability with robust financial protection.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            We believe that insurance should not just be a safety net, but a thriving ecosystem that supports you unconditionally throughout your journey. Our commitment lies in transparent policies, swift human-centric claims, and fostering long-term trust.
          </p>
        </motion.div>
      </div>

      <h2 className="section-title" style={{ marginTop: '5rem' }}>Meet The Owner</h2>
      <motion.div
        className="glass-panel"
        style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '2rem', padding: '2rem', alignItems: 'center' }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ flexShrink: 0 }}>
          <img
            src={ownerImg}
            alt="Mr. Adwait Kamble"
            style={{ width: '220px', height: '220px', borderRadius: '50%', objectFit: 'cover', border: '5px solid white', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop';
            }}
          />
        </div>
        <div>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Mr. Adwait Kamble</h3>
          <p style={{ fontWeight: 600, color: 'var(--accent-green)', marginBottom: '1rem', fontSize: '1.1rem' }}>Founder & CEO</p>
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            "Insurance is the seed you plant today to rest in the shade tomorrow. I founded Divine Insurance with the firm belief that everyone deserves peace of mind built on integrity and steadfast support."
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
