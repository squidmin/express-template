import request from 'supertest';
import express from 'express';
import usersRoutes from '../routes/usersRoutes';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/users', usersRoutes);

describe('Users Routes', () => {
  it('GET /users should return a list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('POST /users should create a new user', async () => {
    const newUser = { name: 'Test User' };
    const response = await request(app)
      .post('/users')
      .send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', newUser.name);
  });

  // Add more tests as needed for other endpoints
});
