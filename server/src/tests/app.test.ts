import request from 'supertest';
import { buildApp } from '../app.js';

describe('App health', () => {
  it('returns service health', async () => {
    const app = buildApp();
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true, service: 'tutorflow-server' });
  });
});