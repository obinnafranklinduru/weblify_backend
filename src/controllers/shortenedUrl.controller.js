const httpStatus = require('http-status');
const ShortenedUrl = require('../models/shortenedUrl.model');
const ErrorResponse = require('../utils/errorResponse');
const generateUniqueId = require('../utils/shortIdGenerator');
const config = require('../config');
const { URLValidation } = require('../validations/shortUrl.validation');

const generateShortUrl = async (req, res, next) => {
    try {
        const { originalUrl } = req.body;
        const urlData = URLValidation.parse({ originalUrl })

        const shortCode = generateUniqueId();
        const shortenedUrl = `${config.BASE_URL}/v1/urls/sh/${shortCode}`;

        // Create a new shortened URL
        const newUrl = await ShortenedUrl.create({
            originalUrl: urlData.originalUrl,
            shortCode,
            shortenedUrl
        });

        res.status(httpStatus.CREATED).json({
            success: true,
            data: {
                id: newUrl._id,
                shortenedUrl: newUrl.shortenedUrl
            }
        });
    } catch (error) {
        next(error);
    }
};

const generateShortUrlPrivate = async (req, res, next) => {
    const { originalUrl, customText } = req.body;

    const userId = req.user.id;

    try {
        let shortCode;
        let shortenedUrl;

        if (customText) {
            // If custom text is provided, use it as the shortened URL
            const existingUrl = await ShortenedUrl.findOne({ shortCode: customText });
            if (existingUrl) return next(new ErrorResponse('Custom text already in use', httpStatus.CONFLICT));

            shortCode = customText;
        } else {
            // Generate a unique short URL using customed ID generator
            shortCode = generateUniqueId();
        }

        shortenedUrl = `${config.BASE_URL}/v1/urls/sh/${shortCode}`;

        // Create a new shortened URL
        const newUrl = await ShortenedUrl.create({
            originalUrl,
            shortCode,
            shortenedUrl,
            userId,
        });

        
        res.status(httpStatus.CREATED).json({
            success: true,
            data: {
                id: newUrl._id,
                shortenedUrl: newUrl.shortenedUrl
            }
        });
    } catch (error) {
        next(error);
    }
};

const getShortenedUrls = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        let userId = req.user.id;

        // Get all shortened URLs for the user (if available)
        const urls = await ShortenedUrl.find({ userId })
            .select('-__v -updatedAt')
            .sort('-createdAt')
            .skip((page - 1) * limit)
            .limit(limit);
        
        const totalDocument = urls.length;
        const totalPages = Math.ceil(totalDocument / limit);

        res.status(httpStatus.OK).json({
            success: true,
            data: urls,
            currentPage: page,
            totalDocument,
            totalPages,
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
        const url = await ShortenedUrl.findOne({ _id: urlId, userId }).select('-__v -updatedAt');
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
    generateShortUrlPrivate,
    getShortenedUrls,
    getShortenedUrlById,
    redirectToOriginalUrl,
    deleteShortenedUrl,
};