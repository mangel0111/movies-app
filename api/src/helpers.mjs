import {disney, GENRE_ID, GENRE_STRING, sony, warner} from "../constants/studio_constants.mjs";


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
  //Map position id to string
  else if (typeof movie.position === "number") {
    movie['position'] = GENRE_STRING[movie.price];
  }
  //Add studioId from parent object
  Object.defineProperty(movie, 'studioId',
    Object.getOwnPropertyDescriptor(studio, 'id'));
  //Remove non wanted properties
  delete movie['price'];

  return movie;
};

export const getGenres = (genres) => {
  return Object.keys(genres).map(key => ({
    id: key,
    genre: genres[key],
    name: Object.keys(GENRE_ID).find((label) => GENRE_ID[label] == key),
  }));
};

export const getStudio = studioId => {
  switch (studioId) {
    case sony.id:
      return sony;
    case disney.id:
      return disney;
    case warner.id:
      return warner;
  }

  return null;
};

export const transferStudio = (originId, destinyId, movieId) => {
   const originalStudio = getStudio(originId);
   const destinyStudio = getStudio(destinyId);
   const { movie } = getMovie(movieId, [originalStudio]);

   if (!originalStudio || !destinyStudio || !movie) throw new Error("Wrong data, please check the values");

  originalStudio.movies = originalStudio.movies.filter(({ id }) => id !== movie.id);
  destinyStudio.movies = destinyStudio.movies.concat(movie);
};
