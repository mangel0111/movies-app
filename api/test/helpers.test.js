
import chai from 'chai';
import { genresMock, moviesMock } from './mocks/index.mjs';
import { getAllMoviesFromStudios, movieConstructor, getAllGenres, transferMovie } from '../src/helpers.mjs';
import { disney, GENRE_ID, sony, warner } from '../constants/studio_constants.mjs';

const expect = chai.expect;

describe('Helpers', function () {
  it('should return all the movies', function () {
    expect(getAllMoviesFromStudios([disney, warner, sony])).to.be.eql(moviesMock);
  });

  it('should return the movies with studioId', function () {
    const movie = {
      id: '11',
      name: 'Nightmare before christmas',
      genre: GENRE_ID.horror,
      img: 'https://www.dimanoinmano.it/img/638590/full/libri-per-ragazzi/infanzia/nightmare-before-christmas.jpg',
      price: 600,
    };
    expect(movieConstructor(movie, disney)).to.be.eql({ ...movie, studioId: disney.id });
  });

  it('should return all the genres', function () {
    expect(getAllGenres()).to.be.eql(genresMock);
  });
});