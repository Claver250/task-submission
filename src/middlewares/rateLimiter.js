const rateLimit = require('express-rate-limit');

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'To many requests, please try again'
    }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'To many authentication attempts'
    }
});

const submissionLimiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'To many submissions, slow down'
    }
});

const analyticsLimiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {globalLimiter, authLimiter, submissionLimiter, analyticsLimiter};