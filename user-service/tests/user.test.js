const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Registration and Login', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('User registered successfully');
    });

    it('should login the user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'wronguser@example.com',
                password: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toBe('Invalid credentials');
    });
});