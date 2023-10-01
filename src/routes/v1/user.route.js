const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    deleteUserById
} = require('../../controllers/user.controller');
const authenticateJWT = require('../../middlewares/auth.middleware')

// Define routes
router.get('/', authenticateJWT, getUsers);
router.get('/:userId', authenticateJWT, getUserById);
router.delete('/', authenticateJWT, deleteUserById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     summary: "Get all users"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: query
 *         name: page
 *         description: "Page number"
 *         type: integer
 *       - in: query
 *         name: limit
 *         description: "Items per page"
 *         type: integer
 *     responses:
 *       200:
 *         description: "Users retrieved successfully"
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/User"
 *             currentPage:
 *               type: integer
 *             totalPages:
 *               type: integer
 *             totalUsers:
 *               type: integer
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     summary: "Get a user by ID"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: "User ID"
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: "User retrieved successfully"
 *         schema:
 *           $ref: "#/definitions/User"
 *       404:
 *         description: "User not found"
 */


/**
 * @swagger
 * /users:
 *   delete:
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     summary: "Delete a user by ID"
 *     produces:
 *       - "application/json"
 *     responses:
 *       200:
 *         description: "User deleted successfully"
 */