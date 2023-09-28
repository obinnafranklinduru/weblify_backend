const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../../controllers/auth.controller');

// Register a new user
router.post('/register', register);

// Login
router.post('/login', login);

// Logout
router.post('/logout', logout);

module.exports = router;