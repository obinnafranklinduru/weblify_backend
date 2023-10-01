const express = require('express');
const router = express.Router();
const {
    generateShortUrl,
    generateShortUrlPrivate,
    getShortenedUrls,
    getShortenedUrlById,
    redirectToOriginalUrl,
    deleteShortenedUrl,
} = require('../../controllers/shortenedUrl.controller');
const authenticateJWT = require('../../middlewares/auth.middleware')

router.post('/public', generateShortUrl);
router.post('/', authenticateJWT, generateShortUrlPrivate);
router.get('/', authenticateJWT, getShortenedUrls);
router.get('/:id', authenticateJWT, getShortenedUrlById);
router.get('/sh/:shortCode', redirectToOriginalUrl);
router.delete('/:id', authenticateJWT, deleteShortenedUrl);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ShortenedUrl
 *   description: Endpoints related to shortened Url
 */

/**
 * @swagger
 * /urls/public:
 *   post:
 *     tags: [ShortenedUrl]
 *     summary: "Generate a short URL (public)"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                   originalUrl:
 *                      type: string
 *                  example:
 *                      originalUrl: https://www.figma.com/file/p1zNYr59nnPWY4wU9DHKEo/Untitled?type=design&node-id=10-79&mode=design&t=SqVUFKxT28tj68wp-0 
 *     responses:
 *       201:
 *         description: "Short URL generated successfully"
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  $ref: '#/components/responses/ShortUrlResponse'
 */

/**
 * @swagger
 * /urls:
 *   post:
 *     tags: [ShortenedUrl]
 *     security:
 *       - bearerAuth: []
 *     summary: "Generate a short URL (private)"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ShortUrl'
 *     responses:
 *       200:
 *         description: "Short URL generated successfully"
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  $ref: '#/components/responses/ShortUrlResponse'
 *       409:
 *         description: "Custom text already in use"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /urls:
 *   get:
 *     tags: [ShortenedUrl]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *     summary: "Get all shortened URLs"
 *     produces:
 *       - "application/json"
 *     responses:
 *       200:
 *         description: "Shortened URLs retrieved successfully"
 */

/**
 * @swagger
 * /urls/{id}:
 *   get:
 *     tags: [ShortenedUrl]
 *     security:
 *       - bearerAuth: []
 *     summary: "Get a shortened URL by ID"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: path
 *         name: id
 *         description: "Shortened URL ID"
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: "Shortened URL retrieved successfully"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *             data:
 *               $ref: "#/definitions/ShortenedUrl"
 *       404:
 *         description: "URL not found"
 */

/**
 * @swagger
 * /urls/sh/{shortCode}:
 *   get:
 *     tags: [ShortenedUrl]
 *     summary: "Redirect to the original URL"
 *     produces:
 *       - "text/html"
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         description: "Shortened URL code"
 *         required: true
 *         type: string
 *     responses:
 *       302:
 *         description: "Redirecting to the original URL"
 */

/**
 * @swagger
 * /urls/{id}:
 *   delete:
 *     tags: [ShortenedUrl]
 *     security:
 *       - bearerAuth: []
 *     summary: "Delete a shortened URL by ID"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: path
 *         name: id
 *         description: "Shortened URL ID"
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: "Shortened URL deleted successfully"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *             message:
 *               type: string
 *       404:
 *         description: "URL not found"
 */

/**
 * @swagger
 * definitions:
 *   ShortenedUrl:
 *     type: object
 *     properties:
 *       originalUrl:
 *         type: string
 *       shortCode:
 *         type: string
 *       shortenedUrl:
 *         type: string
 *       clicks:
 *         type: integer
 *       analytics:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             date:
 *               type: string
 *               format: date-time
 *             userAgent:
 *               type: string
 *             ipAddress:
 *               type: string
 */