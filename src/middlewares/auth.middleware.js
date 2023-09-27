const passport = require('passport');

const authenticateJWT = (req, res, next) => {
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
}

module.exports = { authenticateJWT };