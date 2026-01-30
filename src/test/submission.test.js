const request = require('supertest');
const app = require('../app');
const { User, Task, Submission } = require('../models');
const jwt = require('jsonwebtoken');

describe('Submission Endpoints', () => {
  let internToken;
  let internId;
  let someTaskId;

  beforeAll(async () => {
    // 1. Clean up existing data to avoid conflicts
    await User.destroy({ where: {}, force:true });
    await Task.destroy({ where: {}, force:  true });

    // 2. Create an Intern User
    const user = await User.create({
      email: 'intern@test.com',
      password: 'Password123',
      role: 'intern'
    });
    internId = user.id;

    // 3. Generate a real Token
    internToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret');

    // 4. Create a Task to submit to
    const task = await Task.create({
      title: 'Test Task',
      description: 'Test Description',
      deadline: new Date(Date.now() + 86400000) // Tomorrow
    });
    someTaskId = task.id;
  });

  test('Intern should submit a task successfully', async () => {
    const res = await request(app)
      .post('/api/submissions')
      .set('Authorization', `Bearer ${internToken}`)
      .send({ taskId: someTaskId, submissionLink: 'https://github.com/test' });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.data.status).toBe('submitted');
  });
  
  test('Should return approved submissions in "my submissions"', async () => {
    // Use the ID we created in beforeAll
    await Submission.create({ 
      userId: internId, 
      taskId: someTaskId, 
      status: 'approved',
      submissionLink: 'https://github.com/approved-link'
    });
    
    const res = await request(app)
      .get('/api/submissions/my')
      .set('Authorization', `Bearer ${internToken}`);
  
    expect(res.statusCode).toBe(200);
    expect(res.body.data.some(s => s.status === 'approved')).toBe(true);
  });
});