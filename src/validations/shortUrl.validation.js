const { z } = require('zod');

const URLValidation = z.object({
    originalUrl: z.string()
        .nonempty('URL is required')
        .url('URL must be valid')
});



module.exports = { URLValidation };