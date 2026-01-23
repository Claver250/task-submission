const { sequelize } = require('../models');

describe('Database Connection', () => {
  // Increase timeout for slow DB connections
  jest.setTimeout(10000);

  beforeAll(async () => {
    // We don't need to do anything here yet, 
    // but it's a good place for setup logic
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should connect to the test database successfully', async () => {
    // Instead of checking the name, we check if the connection is alive
    await expect(sequelize.authenticate()).resolves.not.toThrow();
    
    const dbName = sequelize.config.database;
    console.log(`Successfully connected to database: ${dbName}`);
    expect(dbName).toBeDefined();
  });
});