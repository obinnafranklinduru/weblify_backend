const crypto = require('crypto');

const ID_LENGTH = 8;

function generateUniqueId() {
    const randomBytes = crypto.randomBytes(ID_LENGTH);
    const uniqueId = crypto.createHash('sha256').update(randomBytes).digest('hex').slice(0, ID_LENGTH);
    return uniqueId;
};

module.exports = generateUniqueId;