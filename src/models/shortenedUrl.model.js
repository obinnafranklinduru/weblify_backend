const mongoose = require('mongoose');

const shortenedUrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true, trim: true },
    shortenedUrl: { type: String, required: true, trim: true },
    shortCode: { type: String, required: true, trim: true },
    clicks: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    analytics: [
        {
            date: { type: Date, default: Date.now },
            userAgent: { type: String },
            ipAddress: { type: String },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('ShortenedUrl', shortenedUrlSchema);