const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const httpStatus = require('http-status');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');

// const limiter = require('./middlewares/rateLimiter.middleware');
const errorHandler = require('./middlewares/error.middleware');
const ErrorResponse = require('./utils/errorResponse');
const jwtStrategy = require('./config/passport');
const routes = require('./routes/v1');

const app = express();

// Security Middlewares Configuration
app.use(helmet()); // set security HTTP headers
app.use(express.json()); // parse json request body
app.use(express.urlencoded({ extended: true })); // parse urlencoded request body
app.use(mongoSanitize()); // sanitize request data
app.use(compression()); // gzip compression
app.use(cors()); // enable cors
app.options('/*', cors()); // enable cors
// app.use(limiter); // Apply the rate limiting middleware to all requests

// Passport JWT Configuration
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 API routes
app.use('/v1', routes);

// send back a 404 error for any unknown API request
app.use('/*', (req, res, next) => {
    next(new ErrorResponse('Page not found!!!', httpStatus.NOT_FOUND));
});

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;