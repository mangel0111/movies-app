export const getMoviesState = ({movies}) => ({
  error: movies.error,
  fetched: movies.fetched,
  fetching: movies.fetching
});

export const getMoviesData = ({movies}) => ({
  movies: movies.movies,
  filteredMovies: movies.filteredMovies
});

export const getMoviesFilterStatus = ({movies}) => ({
  resetFilter: movies.resetFilter
});

export const getMoviesGenresState = ({movies}) => ({
  errorGenres: movies.errorGenres,
  fetchedGenres: movies.fetchedGenres,
  fetchingGenres: movies.fetchingGenres
});

export const getMoviesGenresData = ({movies}) => ({
  genres: movies.genres
});
