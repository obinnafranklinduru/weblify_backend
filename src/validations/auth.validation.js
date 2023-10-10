const { z } = require('zod');
const User = require('../models/user.model');

const UserRegisterValidation = z.object({
    email: z.string()
        .email('Invalid email address')
        .refine(async (value) => {
            const trimmedEmail = value.trim().toLowerCase();
            const user = await User.findOne({ email: trimmedEmail });
            return !user;
        }, {
            message: 'Email address already exist',
        }),

    password: z.string()
        .min(8, 'Password must be at least 8 characters long'),
});

const UserLogInValidation = z.object({
    email: z.string()
        .email('Invalid email address'),

    password: z.string()
        .min(8, 'Password must be at least 8 characters long')
});

module.exports = { UserRegisterValidation, UserLogInValidation };