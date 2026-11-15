import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from './app.js'

describe('Servidor Express', () => {
  it('responde Hello World! en GET /', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello World!')
  })

  it('responde 404 para una ruta inexistente', async () => {
    const response = await request(app).get('/ruta-inexistente')

    expect(response.status).toBe(404)
  })
})
