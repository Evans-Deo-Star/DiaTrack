// backend/models/Reading.js

const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
    // Link the reading to a specific user (Required for Week 5 Auth)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    // Core Data (From LogForm.js)
    bloodSugar: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        enum: ['mg/dL', 'mmol/L'],
        default: 'mg/dL',
    },

    // Carb intake fields
    // carbIntake: numeric grams estimated / provided
    carbIntake: {
        type: Number,
        default: null,
    },
    // mealType: optional categorical choice (Light, Moderate, High, Very High)
    mealType: {
        type: String,
        enum: ['Light', 'Moderate', 'High', 'Very High', null],
        default: null,
    },

    // Numeric activity field (minutes of activity). Keep optional.
    activity: {
        type: Number,
        default: 0,
    },

    // Time and Date of the reading
    readingDate: {
        type: Date,
        required: true,
        default: Date.now,
    },

    // Optional Details
    dietNote: {
        type: String,
        trim: true,
    },
    // keep existing activityLog string (user notes)
    activityLog: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

module.exports = mongoose.model('Reading', ReadingSchema);
