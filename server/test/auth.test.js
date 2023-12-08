import request from 'supertest';
import app from '../src/app.js';
import mongoose from "mongoose"
import User from "../src/models/userModel.js"
import * as config from "../src/utils/config.js";


beforeAll(async () => {
  // Connect to your test database
  await mongoose.connect(config.mongodb_url);
  // Optional delay to ensure the connection is established
  await new Promise(resolve => setTimeout(resolve, 15000));
}, 30000); // 30 seconds timeout for beforeAll hook

afterAll(async () => {
  // Disconnect after tests are done
  await mongoose.disconnect();
}, 30000); // 30 seconds timeout for afterAll hook

describe('Authentication Endpoints', () => {
  let userToken;

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    }, 30000); // 30 seconds timeout for this test

    // ... Additional test cases for /register ...
  });

  describe('POST /login', () => {
    it('should login a user and return token', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      userToken = res.body.token;
    }, 30000); // 30 seconds timeout for this test

    // ... Additional test cases for /login ...
  });

  describe('GET /logout', () => {
    it('should logout a user', async () => {
      const res = await request(app)
        .get('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'User logged out successfully');
    }, 30000); // 30 seconds timeout for this test

    // ... Additional test cases for /logout ...
  });

  describe('GET /getuser', () => {
    it('should return user data', async () => {
      const res = await request(app)
        .get('/api/v1/auth/getuser')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('email', 'test@example.com');
    }, 30000); // 30 seconds timeout for this test

    // ... Additional test cases for /getuser ...
  });
});