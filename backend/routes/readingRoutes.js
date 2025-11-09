// backend/routes/readingRoutes.js

const express = require('express');
const { logReading, getReadings } = require('../controllers/readingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Log a new reading
router.post('/', protect, logReading);

// Fetch all readings for logged-in user
router.get('/', protect, getReadings);

module.exports = router;
