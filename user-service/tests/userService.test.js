const User = require('../src/models/userModel');

describe('User Model', () => {
    beforeEach(async () => {
        await User.deleteMany(); // Clear the database before each test
    });

    it('should create a new user', async () => {
        const user = new User({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        });
        const savedUser = await user.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe('testuser');
    });
});