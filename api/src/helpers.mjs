import {GENRE_STRING} from '../constants/studio_constants.mjs'


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
  //Add studioId from parent object
  Object.defineProperty(movie, 'studioId',
    Object.getOwnPropertyDescriptor(studio, 'id'));
  //Remove non wanted properties
  delete movie['price'];
  delete movie['id'];

  return movie;
}

