const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import routes (use root files when a routes/ folder is not present)
const authRoutes = require('./auth');
const blockchainRoutes = require('./blockchain');
const subsidyRoutes = require('./subsidy');
const farmerRoutes = require('./farmer');
const chatRoutes = require('./chat');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
// Allow CORS from frontend during development. If FRONTEND_URL is set, use it;
// otherwise allow all origins to support dev servers on varying ports.
app.use(cors({
  origin: process.env.FRONTEND_URL || true,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve React build files (for production)
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/api/subsidy', subsidyRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Tamil Nadu Agricultural Platform API is running',
    timestamp: new Date().toISOString()
  });
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌾 Tamil Nadu Agricultural Platform Backend`);
  console.log(`📡 Access from network: http://0.0.0.0:${PORT}`);
});

module.exports = app;
