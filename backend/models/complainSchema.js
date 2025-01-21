const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student', // Ensure the 'student' model exists
        required: true
    },
    date: {
        type: Date,
        default: Date.now, // Default value as current date if not provided
        required: true
    },
    complaint: {
        type: String,
        required: true,
        minlength: 10, // Minimum length for complaint text
        maxlength: 500, // Maximum length for complaint text
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin', // Ensure the 'admin' model exists
        required: true
    }
});

// Adding indexes for faster lookup
complainSchema.index({ school: 1 });
complainSchema.index({ user: 1 });

module.exports = mongoose.model("complain", complainSchema);
