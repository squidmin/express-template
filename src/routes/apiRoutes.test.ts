import request from 'supertest';
import express from 'express';
import apiRoutes from '../routes/apiRoutes';

const app = express();
app.use('/', apiRoutes);

describe('GET /', () => {
  it('should respond with Hello World!', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('Home page');
  });
});
