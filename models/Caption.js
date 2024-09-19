const mongoose = require('mongoose');

// Define the Caption schema
const CaptionSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Caption', CaptionSchema);

