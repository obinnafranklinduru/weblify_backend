const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

blacklistedTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

const isTokenBlacklisted = async (token) => {
    try {
        const blacklistedToken = await BlacklistedToken.findOne({ token });
        return blacklistedToken ? true : false;
    } catch (error) {
        throw new Error('Error checking blacklisted token');
    }
};


module.exports = { BlacklistedToken, isTokenBlacklisted };