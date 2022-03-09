export const getFilteredMovies = (filter, movies) =>
  filter !== ""
    ? movies?.filter(
        (movie) =>
          movie.name.toLowerCase().includes(filter) ||
          `${movie.price}`.includes(filter) ||
          movie.genre.toLowerCase().includes(filter)
      )
    : movies;
