const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger'); // Fixed path if moving to src
require('dotenv').config();

const authRoute = require('./routes/authRoute');
const taskRoute = require('./routes/taskRoute');
const submissionRoute = require('./routes/submissionRoute');
const analysticsRoute = require('./routes/analyticsRoute');
const { globalLimiter } = require('./middlewares/rateLimiter');
const logger = require('./middlewares/loggerMiddleware');

const app = express();

app.use(express.json());
app.use(globalLimiter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(logger);
app.use('/api/auth', authRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/submissions', submissionRoute);
app.use('/api/analytics', analysticsRoute);

// EXPORT THIS FOR JEST
module.exports = app;