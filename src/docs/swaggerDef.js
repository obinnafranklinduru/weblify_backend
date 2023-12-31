const { version } = require('../../package.json');
const config = require('../config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Weblify API Documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/obinnafranklinduru/weblify_backend/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `https://weblify.onrender.com/v1`,
    },
    {
      url: `http://localhost:${config.PORT}/v1`,
    },
  ],
};

module.exports = swaggerDef;