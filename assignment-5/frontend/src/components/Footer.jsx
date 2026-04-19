import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: 'white', padding: '3rem 0 1.5rem', borderTop: '1px solid rgba(136, 169, 124, 0.2)', marginTop: '4rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
            Secure Your Future Nature's Way
          </p>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8 }}>
            © 2026 Divine Insurance Company. <br />
            Head Office: PCMC near Aditya Birla Hospital, Ganga Builders office no. 2, Pune, Maharashtra.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
