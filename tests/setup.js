// tests/setup.js
const { sequelize } = require('../src/models');

beforeAll(async () => {
  // Optional: Ensure DB is synced before tests start
  // await sequelize.sync(); 
});

afterAll(async () => {
  // This is the magic line that closes the "Open Handles"
  await sequelize.close(); 
});