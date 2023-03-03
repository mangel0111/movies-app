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

//we can use lodash instead
const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0
}

const matchesFilters = (movie, {genre, title, minPrice, maxPrice}) => {
  return (!genre || movie.genre === +genre) &&
      (!title || movie.name.toLowerCase().includes(title.toLowerCase())) &&
      (!minPrice || movie.price >= +minPrice) &&
      (!maxPrice || movie.price <= +maxPrice);
}

export const getMoviesFromStudios = (studios, filters = {}) => {
  let allMovies = [];
  const shouldFilter = !isObjectEmpty(filters);
  studios.forEach(singleStudio => {
    singleStudio.movies.forEach(movie => {
      if(!shouldFilter || matchesFilters(movie, filters)){
        allMovies.push(movieConstructor(movie, singleStudio))
      }
    })
  });
  return allMovies;
};

export const movieConstructor = (movie, studio) => {
  //Add studioId from parent object
  const withStudioId = {...movie, studioId: studio.id};
  //Remove non wanted properties
  const {price, ...restMovie} = withStudioId;

  return restMovie;
};

export const getMovieStudio = (movieId, studios) => (
  studios.find(studio => 
    studio.movies.some(movie => movie.id === movieId)
  )
);

export const getStudio = (studioId, studios) => (
  studios.find(studio => 
    studio.id === studioId
  )
);

export const removeMovieFromStudio = (studio, movieId) =>{
  return studio.movies.reduce((acc, movie) => {
    if (movie.id !== movieId) {
      acc.remainingMovies.push(movie)
    }else{
      acc.removedMovie = movie
    }
    return acc;
  }, {remainingMovies:[], removedMovie:null});
}