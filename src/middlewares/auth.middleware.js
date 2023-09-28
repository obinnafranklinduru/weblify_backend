const passport = require('passport');
const { isTokenBlacklisted } = require('../models/blacklist-token.model.js');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization') || req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (token && !isTokenBlacklisted(token)) {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err) return next(err);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: 'Unauthorized',
                });
            }

            req.user = user;
            next();
        })(req, res, next);
    } else {
        res.status(401).json({ success: false, error: 'Unauthorized' });
    }
}

module.exports = authenticateJWT;