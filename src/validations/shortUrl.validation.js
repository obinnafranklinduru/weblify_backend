const { z } = require('zod');

const URLValidation = z.object({
    originalUrl: z.string()
        .url('URL must be valid')
});



module.exports = { URLValidation };