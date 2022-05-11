import log4js from 'log4js';
import {
  GENRE_STRING,
  sonyImages
} from '../../../constants/studio_constants.mjs';

const logger = log4js.getLogger();

export const getMovie = (movieId, studios) => {
  let movie;
  let studio = studios.find((t) => {
    movie = t.movies.find((p) => p.id === movieId);
    return movie;
  });
  if (movie && studio) {
    return {movie, studioId: studio.id};
  }

  return false;
};

export const getAllMoviesFromStudios = (studios) => {
  let allMovies = [];
  studios.forEach((studio) => {
    studio.movies.map((movie) => {
      let movieData = movieConstructor(movie, studio);
      movieData = findImageById(movieData);
      allMovies.push(movieData);
    });
  });
  return allMovies;
};

const movieConstructor = (movie, studio) => {
  if (movie.url) {
    Object.defineProperty(
      movie,
      'img',
      Object.getOwnPropertyDescriptor(movie, 'url')
    );
    delete movie['url'];
  }
  Object.defineProperty(
    movie,
    'studioId',
    Object.getOwnPropertyDescriptor(studio, 'id')
  );
  Object.defineProperty(
    movie,
    'studioName',
    Object.getOwnPropertyDescriptor(studio, 'name')
  );
  return movie;
};

const findImageById = (movie) => {
  if (sonyImages[movie.id]) {
    movie.img = sonyImages[movie.id];
  }
  return movie;
};

export const mapGenres = (genresObject) =>
  Object.entries(genresObject).map(([key, value]) => {
    return {
      label: key,
      value: value
    };
  });
