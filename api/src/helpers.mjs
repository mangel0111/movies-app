import { GENRE_STRING, sonyImages } from '../constants/studio_constants.mjs'
import { createLogger, format, transports } from "winston";

export const getMovie = (movieId, studios) => {
  let movie;
  let studio = studios.find(t => {
    movie = t.movies.find(p => p.id === movieId)
    return movie
  })
  if (movie && studio) {
    return { movie, studioId: studio.id }
  }

  return false
};

export const getAllMoviesFromStudios = (studios) => {
  let allMovies = [];
  studios.forEach(singleStudio => {
    singleStudio.movies.map(movie => {
      allMovies.push(movieConstructor(movie, singleStudio))
    })
  });
  return allMovies;
};

export const movieConstructor = (movie, studio) => {
  //Set url property to img
  if (movie.url) {
    Object.defineProperty(movie, 'img',
      Object.getOwnPropertyDescriptor(movie, 'url'));
    delete movie['url'];
  }
  else {
    if (studio.id === '3' && !movie.img) {
      Object.defineProperty(movie, 'img',
        Object.getOwnPropertyDescriptor(sonyImages, movie.id));
    }
    //Map position id to string
    if (typeof movie.position === "number") {
      movie['position'] = GENRE_STRING[movie.price];
    }
  }

  return { ...movie, studioId: studio.id };
}

export const getAllGenres = () => {
  const ids = Object.keys(GENRE_STRING);
  let genres = []
  genres = ids.map((id) => ({ id: Number(id), desc: GENRE_STRING[id] }));
  return genres;
}

export const transferMovie = (movieId, sellerId, buyerId, studios) => {
  const sellerStudio = studios.find((studio) => studio.id === sellerId);
  const buyerStudio = studios.find((studio) => studio.id === buyerId);
  const movie = sellerStudio.movies.find((movie) => movie.id === movieId);
  const index = sellerStudio.movies.findIndex((movie) => movie.id === movieId);
  buyerStudio.movies.push(sellerStudio.movies[index]);
  buyerStudio.money -= movie.price;
  sellerStudio.movies.splice(index, 1);
  sellerStudio.money += movie.price;
}

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

export const logger = createLogger({
  levels: logLevels,
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console({})],
});
