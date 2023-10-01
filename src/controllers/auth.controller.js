const httpStatus = require('http-status');

const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/user.model');
const { BlacklistedToken, isTokenBlacklisted } = require('../models/blacklist-token.model');
const { UserRegisterValidation, UserLogInValidation } = require('../validations/auth.validation');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userData = await UserRegisterValidation.parseAsync({ email, password })

        const user = await User.create({ email: userData.email, password: userData.password });

        const accessToken = await user.generateAccessToken()

        res.status(httpStatus.CREATED).send(
            {
                success: true,
                data: {
                    id: user._id,
                    email: user.email,
                    accessToken
                }
            }
        );
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userData = UserLogInValidation.parse({ email, password })
        
        const user = await User.findOne({ email: userData.email });

        if (!user) return next(new ErrorResponse('Incorrect email or password', httpStatus.UNAUTHORIZED));

        if(!(await user.isPasswordMatch(userData.password))) return next(new ErrorResponse('Incorrect email or password', httpStatus.UNAUTHORIZED));

        const accessToken = await user.generateAccessToken();

        res.status(httpStatus.OK).send(
            {
                success: true,
                data: {
                    id: user._id,
                    email: user.email,
                    accessToken
                }
            }
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization') || req.header('authorization');
        const token = authHeader && authHeader.split(' ')[1];

        if (token && !(await isTokenBlacklisted(token))) {
            await BlacklistedToken.create({ token });
            
            res.status(httpStatus.OK).json({ success: true, message: 'Logout successful' });
        } else {
            res.status(httpStatus.UNAUTHORIZED).json({ success: false, error: 'Unauthorized' });
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