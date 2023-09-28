const httpStatus = require('http-status');
const ShortenedUrl = require('../models/shortenedUrl.model');
const ErrorResponse = require('../utils/ErrorResponse');
const generateUniqueId = require('../utils/shortIdGenerator');
const config = require('../config');

const generateShortUrl = async (req, res, next) => {
    const { originalUrl, customText } = req.body;

    let userId = null;

    try {
        let shortCode;

        if (req.user && req.user.id) {
            userId = req.user.id;
        }

        if (customText) {
            // If custom text is provided, use it as the shortened URL
            const existingUrl = await ShortenedUrl.findOne({ shortCode: customText });
            if (existingUrl) return next(new ErrorResponse('Custom text already in use', httpStatus.CONFLICT));

            shortCode = customText;
        } else {
            // Generate a unique short URL using customed ID generator
            shortCode = generateUniqueId();
        }

        // Create a new shortened URL
        const newUrl = new ShortenedUrl({
            originalUrl,
            shortCode,
            userId,
        });

        await newUrl.save();
        res.status(httpStatus.OK).json({
            success: true,
            shortenedUrl: `${config.BASE_URL}/v1/urls/sh/${shortCode}`
        });
    } catch (error) {
        next(error);
    }
};

const getShortenedUrls = async (req, res, next) => {
    try {
        let userId = req.user.id;

        // Get all shortened URLs for the user (if available)
        const urls = await ShortenedUrl.find({ userId });

        res.status(httpStatus.OK).json({
            success: true,
            data: urls
        });
    } catch (error) {
        next(error);
    }
};

const getShortenedUrlById = async (req, res, next) => {
    try {
        let userId = req.user.id;
        const urlId = req.params.id;

        // Get the shortened URL by ID for the user (if available)
        const url = await ShortenedUrl.findOne({ _id: urlId, userId });
        if (!url) return next(new ErrorResponse('URL not found', httpStatus.NOT_FOUND));

        res.status(httpStatus.OK).json({
            success: true,
            data: url
        });
    } catch (error) {
        next(error);
    }
};

const redirectToOriginalUrl = async (req, res, next) => {
    const shortCode = req.params.shortCode;

    try {
        const url = await ShortenedUrl.findOne({ shortCode });

        if (!url) return next(new ErrorResponse('URL not found', httpStatus.NOT_FOUND));

        // Update click count and analytics
        url.clicks += 1;
        url.analytics.push({
            date: new Date(),
            userAgent: req.headers['user-agent'],
            ipAddress: req.ip,
        });

        await url.save();

        res.status(httpStatus.FOUND).redirect(url.originalUrl);
    } catch (error) {
        console.error(error)
        next(error);
    }
};

const deleteShortenedUrl = async (req, res, next) => {
    try {
        let userId = req.user.id;
        const urlId = req.params.id;

        // Delete the shortened URL by ID for the user (if available)
        const url = await ShortenedUrl.findOneAndRemove({ _id: urlId, userId });
        if (!url) return next(new ErrorResponse('URL not found', httpStatus.NOT_FOUND));

        res.status(httpStatus.OK).json({
            success: true,
            message: 'URL deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    generateShortUrl,
    getShortenedUrls,
    getShortenedUrlById,
    redirectToOriginalUrl,
    deleteShortenedUrl,
};