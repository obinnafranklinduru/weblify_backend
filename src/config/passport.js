const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

const config = require('.')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET || '<code />',
}

passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            if (jwtPayload.type !== tokenTypes.ACCESS) throw new Error('Invalid token type');

            const user = await User.findById(jwtPayload.id);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }
    ));

module.exports = { passport };