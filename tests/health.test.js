const request = require('supertest');
const app = require('../src/app');

describe('Health Check Endpoint', () => {
  it('should return status ok with database info', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('database');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body.status).toBe('ok');
    expect(['connected', 'disconnected']).toContain(response.body.database);
  });
});
