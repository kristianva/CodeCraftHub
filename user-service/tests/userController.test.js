const request = require('supertest');
const app = require('../src/app'); // adjust the path as needed
const User = require('../src/models/userModel');

describe('User Controller', () => {
    beforeEach(async () => {
        await User.deleteMany(); // Clear the database before each test
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should login a registered user', async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });

        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});