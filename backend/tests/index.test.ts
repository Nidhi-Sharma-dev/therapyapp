import express from 'express';
import request from 'supertest';
import { apiRouter } from '../src/index';

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

describe('Express API HTTP Processing', () => {
  it('returns 400 validation error if intensity values are out of bounds', async () => {
    const response = await request(app)
      .post('/api/music-wellness/generate')
      .send({
        currentMood: 'Anxious',
        intensity: 42,
        desiredMood: 'Calm',
        musicPreferences: ['Piano'],
        sessionDuration: 15,
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('ValidationError');
  });

  it('GET /api/catalog returns moods, intensities, and durations', async () => {
    const response = await request(app).get('/api/catalog');
    expect(response.status).toBe(200);
    expect(response.body.moods).toBeDefined();
    expect(response.body.intensities).toBeDefined();
    expect(response.body.durations).toBeDefined();
    expect(response.body.moods.length).toBe(5);
    expect(response.body.intensities.length).toBe(5);
    expect(response.body.durations).toEqual([5, 10, 15, 20, 30]);
  });

  it('POST /api/playlist validates required fields', async () => {
    const response = await request(app)
      .post('/api/playlist')
      .send({ mood_id: 'bogus', intensity_id: 'balanced', duration_minutes: 10 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('ValidationError');
  });
});
