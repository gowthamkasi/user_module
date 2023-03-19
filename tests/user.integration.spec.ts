import 'jest';
import { describe, expect } from '@jest/globals';
import supertest, { SuperAgentTest } from 'supertest';
import { config } from 'dotenv';
import app from '../src/app';
import db from '../src/connections/db';

config();

const agent = supertest.agent(app);

beforeAll(async () => {
  await db.sync({ alter: true }); // Connect to test DB
  console.log('Database Connected');

  const port = parseInt(process.env.PORT!);
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

describe('User Api integration tests', () => {
  let userId: string;

  it('can create user', async () => {
    const { body, statusCode } = await agent
      .post(`/api/v1/user`)
      .set('Accept', 'application/json')
      .send({
        name: 'testUser',
        email: 'testUser@gmail.com',
        countryCode: '+91',
        mobileNumber: '1234567890',
        dob: '2023-01-01',
      });

    userId = body.data.id;
    expect(statusCode).toBe(200);
  });

  it('can Get user', async () => {
    const { statusCode } = await agent
      .get(`/api/v1/user/${userId}`)
      .set('Accept', 'application/json');

    expect(statusCode).toBe(200);
  });

  it('can Update user', async () => {
    const { statusCode } = await agent
      .patch(`/api/v1/user/${userId}`)
      .set('Accept', 'application/json')
      .send({
        dob: '2023-01-05',
      });

    expect(statusCode).toBe(200);
  });

  it('can Delete user', async () => {
    const { statusCode } = await agent
      .delete(`/api/v1/user/${userId}`)
      .set('Accept', 'application/json');

    expect(statusCode).toBe(200);
  });

  it('can throw not found user', async () => {
    const { body } = await agent
      .get(`/api/v1/user/${userId}`)
      .set('Accept', 'application/json');

    expect(body).toEqual(
      expect.objectContaining({
        msg: 'User not found',
      })
    );
  });
});
