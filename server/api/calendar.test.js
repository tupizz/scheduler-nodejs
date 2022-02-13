const request = require('supertest');
const express = require('express');
const router = require('./calendar');

const app = express();
app.use(router);

describe('GET /api/calendar', () => {
  it('returns timeslots', async () => {
    const req = await request(app)
      .get('/api/calendar')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(req.body).toHaveProperty('name');
    expect(req.body).toHaveProperty('timeslotLengthMin');
    expect(req.body).toHaveProperty('timeslots');
  });
});
