const httpStatus = require('http-status');
const User = require('../models/user.model');

const getUsers = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const users = await User.find({})
            .select('-__v -password')
            .skip((page - 1) * limit)
            .limit(limit);

        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        res.status(httpStatus.OK).json({
            success: true,
            data: users,
            currentPage: page,
            totalPages,
            totalUsers,
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).select('-__v -password');
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
        }
        res.status(httpStatus.OK).json({ user });
    } catch (error) {
        next(error);
    }
};


const deleteUserById = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.user.id);
        console.log(deletedUser)
        if (!deletedUser) {
            return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
        }
        res.status(httpStatus.OK).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUserById,
    deleteUserById
}