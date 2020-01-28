const request = require('supertest')

const app = require('../app')

describe('Root Path', () => {
  it('should respond with an html file and a 200 status code', async () => {
    const res = await request(app).get('/')
    expect(res.header['content-type']).toMatch(/html/)
    expect(res.status).toBe(200)
  })
})
