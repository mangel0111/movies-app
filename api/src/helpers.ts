import { IMovie, IStudio } from './constants/interfaces';
import { disney, sony, warner } from './constants/studio_constants';

export const getMovie = (movieId: number) => {
  const studios = getStudios();
  let movie: IMovie;
  const studio = studios.find((t) => {
    movie = t.movies.find((p) => p.id === movieId);
    return movie;
  });
  return { movie, studioId: studio?.id };
};

export const getAllMoviesFromStudios = () => {
  const allMovies: IMovie[] = [];
  getStudios().forEach((singleStudio) => {
    singleStudio.movies.map((movie) => {
      allMovies.push(movieConstructor(movie, singleStudio));
    });
  });
  return allMovies;
};

export const movieConstructor = (movie: IMovie, studio: IStudio) => {
  if (movie.url) {
    movie.img = movie.url;
    delete movie['url'];
  }

  //Add studioId from parent object
  Object.defineProperty(movie, 'studioId', Object.getOwnPropertyDescriptor(studio, 'id'));
  return movie;
};

// exporting this function allows reusability and also easier unit testing
export const getStudios = () => [disney, warner, sony];

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
