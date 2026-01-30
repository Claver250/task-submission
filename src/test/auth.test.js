const request = require('supertest');
const app = require('../app'); 
const { User, sequelize } = require('../models'); // Import sequelize too

describe('Auth System', () => {
  // 1. Ensure tables exist and are empty before tests
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // This creates the "Users" table
  });

  beforeEach(async () => {
    await User.destroy({ where: {}, force: true });
  });

  test('Should register a new intern successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',       // ADDED THIS: Fixes the notNull violation
        email: 'new@test.com',
        password: 'Password123',
        role: 'intern'
      });
    
    expect(res.statusCode).toBe(201);
  });

  test('Should login and return a JWT', async () => {
    // We must include 'name' here too
    await User.create({
      name: 'Login User',        // ADDED THIS
      email: 'login@test.com',
      password: 'Password123',
      role: 'intern'
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@test.com',
        password: 'Password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('token');
  });
});