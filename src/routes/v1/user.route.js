const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
} = require('../../controllers/user.controller');
const authenticateJWT = require('../../middlewares/auth.middleware')

// Define routes
router.get('/', authenticateJWT, getUsers);
router.get('/:userId', authenticateJWT, getUserById);
router.put('/:userId', authenticateJWT, updateUserById);
router.delete('/:userId', authenticateJWT, deleteUserById);

module.exports = router;