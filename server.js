const app = require('./src/app'); // Import the logic
const db = require('./src/models');
const PORT = process.env.PORT || 4187;

app.listen(PORT, async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({ alter: true });
        console.log("Database and table synced");
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});