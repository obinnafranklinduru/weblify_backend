const httpStatus = require('http-status');

const User = require('../models/user.model');
const { TokenBlacklisted } = require('../models/blacklist-token.model.js');
const ErrorResponse = require('../utils/ErrorResponse');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.create({ email, password });

        const accessToken = await user.generateAccessToken()

        res.status(httpStatus.CREATED).send({ user, accessToken });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });

        if (!user && !(await user.isPasswordMatch(password))) return next(new ErrorResponse('Incorrect email or password', httpStatus.UNAUTHORIZED));

        const accessToken = await user.generateAccessToken();

        res.send({ user, accessToken });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            await TokenBlacklisted.create(token);
            
            res.status(200).json({ success: true, message: 'Logout successful' });
        } else {
            res.status(401).json({ success: false, error: 'Unauthorized' });
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = {
    register,
    login,
    logout
}