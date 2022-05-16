import request from 'supertest';
import { app } from '../src/index.mjs';
import chai from 'chai';
import { genresMock, moviesMock, studiosMock } from './mocks/index.mjs';

const expect = chai.expect;

describe('Endpoints', function () {
  it('respond with all the genres', function (done) {
    request(app)
      .get("/genres")
      .end(function (err, res) {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.be.eql(genresMock);
        done();
      });
  });

  it('respond with all the movies', function (done) {
    request(app)
      .get("/movies")
      .end(function (err, res) {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.be.eql(moviesMock);
        done();
      });
  });

  it('respond with all the studios', function (done) {
    request(app)
      .get("/studios")
      .end(function (err, res) {
        expect(res.statusCode).to.eql(200);
        expect(res.body).to.be.eql(studiosMock);
        done();
      });
  });

  it('update movies and studios. Returns a 204 code', function (done) {
    request(app)
      .post("/transfer")
      .send({ movieId: '11', sellerId: '1', buyerId: '2' })
      .end(function (err, res) {
        expect(res.statusCode).to.eql(204);
        done();
      });
  });
});