const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 4187;
const db = require('./src/config/database');

const app = express();
const authRoute = require('./src/routes/authRoute');
const taskRoute = require('./src/routes/taskRoute');
const submissionRoute = require('./src/routes/submissionRoute');

app.use(express.json());

const logger = (req, res, next) => {
    console.log("Request received at", new Date().toLocaleString());
    next();
};

app.use(logger);
app.use('/api/auth', authRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/submissions', submissionRoute);

app.listen(PORT, async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log('Database connected and synchronized');
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});