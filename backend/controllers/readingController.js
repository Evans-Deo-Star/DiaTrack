// backend/controllers/readingController.js

const Reading = require('../models/Reading');
const mongoose = require('mongoose'); // CRITICAL: Needed to convert user ID type

// Helper: map mealType to estimated carb grams
const mealTypeToCarbs = (mealType) => {
    switch ((mealType || '').toLowerCase()) {
        case 'light': return 30;
        case 'moderate': return 60;
        case 'high': return 90;
        case 'very high': return 120;
        default: return null; // keep null so we can fallback to default later
    }
};

// @desc    Log a new health reading
// @route   POST /api/readings
// @access  Private (protected by authMiddleware)
exports.logReading = async (req, res) => {
    // Convert user ID to ObjectId for robust saves
    const userId = new mongoose.Types.ObjectId(req.user._id);

    try {
        const {
            bloodSugar,
            unit,
            date,
            time,
            dietNote,
            activityLog,
            // new optional fields from frontend:
            mealType,       // e.g., 'Moderate' (string)
            carbIntake,     // numeric grams (optional)
            activity        // numeric minutes (optional)
        } = req.body;

        // Combine date and time fields into a single JavaScript Date object
        // If date/time not provided, use now
        let readingDateTime;
        if (date && time) {
            readingDateTime = new Date(`${date}T${time}:00`);
        } else {
            readingDateTime = new Date();
        }

        // Basic validation for blood sugar
        if (!bloodSugar || isNaN(bloodSugar) || Number(bloodSugar) <= 0) {
            return res.status(400).json({ msg: 'Please enter a valid blood sugar reading.' });
        }

        // Resolve carb intake: priority -> explicit carbIntake (number) -> mealType mapping -> default 60
        let resolvedCarbIntake = null;
        if (carbIntake !== undefined && carbIntake !== null && !isNaN(Number(carbIntake))) {
            resolvedCarbIntake = Number(carbIntake);
        } else if (mealType) {
            const mapped = mealTypeToCarbs(mealType);
            if (mapped) resolvedCarbIntake = mapped;
        }
        // Keep null if unresolved (we'll set default later in ML flow), but you can force default here:
        if (resolvedCarbIntake === null) resolvedCarbIntake = 60; // sensible default

        // Resolve activity: prefer numeric activity field, otherwise 0
        const resolvedActivity = (activity !== undefined && activity !== null && !isNaN(Number(activity)))
            ? Number(activity)
            : 0;

        // Create the new reading entry
        const newReading = await Reading.create({
            user: userId,
            bloodSugar: Number(bloodSugar),
            unit: unit || 'mg/dL',
            readingDate: readingDateTime,
            dietNote: dietNote || '',
            activityLog: activityLog || '',
            mealType: mealType || null,
            carbIntake: resolvedCarbIntake,
            activity: resolvedActivity
        });

        res.status(201).json({
            success: true,
            data: newReading,
            message: 'Reading logged successfully and saved to MongoDB.'
        });

    } catch (error) {
        console.error("MongoDB Reading Save Error:", error);
        res.status(500).json({ msg: 'Server error during logging.' });
    }
};

// @desc    Get all readings for the logged-in user
// @route   GET /api/readings
// @access  Private
exports.getReadings = async (req, res) => {
    try {
        // Find readings linked to the current user, sort by date (newest first)
        const readings = await Reading.find({ user: req.user._id }).sort({ readingDate: -1 }).limit(10);

        res.status(200).json({
            success: true,
            count: readings.length,
            data: readings,
        });
    } catch (error) {
        console.error("Error fetching readings:", error.message);
        res.status(500).json({ msg: 'Server error fetching data.' });
    }
};
