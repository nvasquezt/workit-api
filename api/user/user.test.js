const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const connectDB = require('../../config/database');
const { getUserById } = require('../../api/user/user.service');

const request = supertest(app);

describe('User testing', () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
    describe('GET /api/user', () => {
        it('should respond with status code 200', async () => {
            const response = await getUserById('625daf396054b983d000fa21');
            expect(response.status).toBe(201);
        });

        it('should show a user', async () => {
            const response = await getUserById('625daf396054b983d000fa21');
            console.log(response);
            expect(response).toEqual(
                expect.objectContaining({
                    _id: expect.any(String),
                    active: expect.any(Boolean),
                    createdAt: expect.any(String),
                    email: expect.any(String),
                    last: expect.any(String),
                    name: expect.any(String),
                    offeredServices: expect.any(Array),
                    password: expect.any(String),
                    pasaswordResetExpires: expect.any(String),
                    passwordResetToken: expect.any(String),
                    purchasedServices: expect.any(Array),
                    role: expect.any(String),
                    updatedAt: expect.any(String),
                    username: expect.any(String),
                  })
            );
        });
    });
});
