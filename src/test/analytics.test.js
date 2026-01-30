const request = require('supertest');
const app = require('../app');
const { User, Submission } = require('../models');
const { generateToken } = require('../src/utils/auth');

describe('Analytics Endpoints', () => {
  let adminToken;
  let internToken;

  beforeAll(async () => {
    // 1. Create an Admin
    const admin = await User.create({ email: 'admin@test.com', password: 'password', role: 'admin' });
    adminToken = generateToken(admin);

    // 2. Create an Intern
    const intern = await User.create({ email: 'intern@test.com', password: 'password', role: 'intern' });
    internToken = generateToken(intern);
  });

  test('GET /api/analytics/dashboard should return 200 for Admin', async () => {
    const res = await request(app)
      .get('/api/analytics/dashboard')
      .set('Authorization', `Bearer ${adminToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('totalSubmissions');
  });

  test('GET /api/analytics/dashboard should return 403 for Intern', async () => {
    const res = await request(app)
      .get('/api/analytics/dashboard')
      .set('Authorization', `Bearer ${internToken}`);
    
    expect(res.statusCode).toEqual(403);
  });

  test('GET /api/analytics/dashboard should return 401 if no token', async () => {
    const res = await request(app).get('/api/analytics/dashboard');
    expect(res.statusCode).toEqual(401);
  });
});