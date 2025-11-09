// backend/routes/dataRoutes.js

const express = require('express');
const { getRiskScore } = require('../controllers/mlController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Production-ready: Both GET and POST
router.get('/risk-score', protect, getRiskScore);  // Convenience / fallback
router.post('/risk-score', protect, getRiskScore); // Main production route (accepts POST data)

module.exports = router;
