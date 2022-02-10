import request from 'supertest'
import app from '../src/server.mjs'
import * as constants from '../constants/studio_constants.mjs'

describe('Transfer ownership', () => {
  it('should return 500 if body is empty', async () => {
    const noBody = await request(app(constants)).post('/transfer').send({})
    expect(noBody.statusCode).toBe(500)
    expect(noBody.text).toBe('originId, destinationId or movieId not provided')
  })
  it('should check if originId and destinationId are equal', async () => {
    const equalIds = await request(app(constants))
      .post('/transfer')
      .send({ originId: '5', destinationId: '5', movieId: '10' })
    expect(equalIds.statusCode).toBe(500)
    expect(equalIds.text).toBe('originId and destionationId must not be equal')
  })
  it('should check if studio ids are valid', async () => {
    const studioIdsNonExisting = await request(app(constants))
      .post('/transfer')
      .send({
        originId: '5348975934',
        destinationId: '34906830954',
        movieId: '10',
      })
    expect(studioIdsNonExisting.text).toBe(
      'originId or destionationId not valid'
    )
  })
  it('should check if originId and movieId are linked', async () => {
    const movieNotExists = await request(app(constants))
      .post('/transfer')
      .send({
        originId: '2',
        destinationId: '3',
        movieId: '464533',
      })
    expect(movieNotExists.text).toBe(
      'originId does not have movieId associated'
    )
    const movieExists = await request(app(constants)).post('/transfer').send({
      originId: '2',
      destinationId: '3',
      movieId: '21',
    })
    expect(movieExists.ok).toBe(true)
    // TODO: how we chech if it has properties 'originStudio' and 'destinationStudio'
    expect(movieExists.body).toBeTruthy()
  })
})
