const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

// Connect to MongoDB only when URI is configured correctly
const mongoUri = process.env.MONGO_URI || '';
if (mongoUri.startsWith('mongodb://') || mongoUri.startsWith('mongodb+srv://')) {
  connectDB();
} else {
  console.warn('MongoDB not configured. API database features may be unavailable.');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve assignment HTML/CSS/JS files from project root
const projectRoot = path.resolve(__dirname, '..', '..');
app.use(express.static(projectRoot));

// Routes
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'AeroDash API Server is running 🚀' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌤️  AeroDash Server running on port ${PORT}`);
});
