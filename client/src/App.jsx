import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SavedDashboards from './pages/SavedDashboards';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-root">
        <Navbar />
        <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<SavedDashboards />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
