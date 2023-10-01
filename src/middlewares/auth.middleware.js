const passport = require('passport');
const { isTokenBlacklisted } = require('../models/blacklist-token.model.js');


const authenticateJWT = async (req, res, next) => {
    const authHeader = req.header('Authorization') || req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (token && (await isTokenBlacklisted(token))) return res.status(401).json({ success: false, error: 'Unauthorized' });

    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized',
            });
        }

        req.user = { id: user._id };
        next();
    })(req, res, next);
};

module.exports = authenticateJWT;