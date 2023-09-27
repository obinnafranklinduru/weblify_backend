const express = require('express');
const router = express.Router();
const {
    generateShortUrl,
    getShortenedUrls,
    getShortenedUrlById,
    redirectToOriginalUrl,
    deleteShortenedUrl,
} = require('../../controllers/shortenedUrl.controller');

router.post('/', generateShortUrl);
router.get('/', getShortenedUrls);
router.get('/:id', getShortenedUrlById);
router.get('/sh/:shortCode', redirectToOriginalUrl);
router.delete('/:id', deleteShortenedUrl);

module.exports = router;