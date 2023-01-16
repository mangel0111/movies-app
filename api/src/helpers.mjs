import { sonyImages } from '../constants/studio_constants.mjs';

export const getMovie = (movieId, studios) => {
  let movie;
  let studio = studios.find(t => {
    movie = t.movies.find(p => p.id === movieId)
    return movie
  })
  if (movie && studio) {
    return {movie, studioId: studio.id}
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
  // Note from DavidRamos: this code is not doing anything useful as I see, it's mixing an index for genres with movie prices.
  //Map position id to string
  // else if (typeof movie.position === "number") {
  //   movie['position'] = GENRE_STRING[movie.price];
  // }

  // This step below adds missing images for sony:
  if (!movie.img && sonyImages[movie.id]) {
    movie.img = sonyImages[movie.id];
  }

  //Add studioId from parent object
  Object.defineProperty(movie, 'studioId',
    Object.getOwnPropertyDescriptor(studio, 'id'));

  return movie;
}

export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
