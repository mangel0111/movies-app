export const filterMovies = (movies, filter) => {
  const { genre, title, price } = filter;
  let filteredMovies = movies;
  if (genre !== 'all') {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.genre === genre;
    });
  }
  filteredMovies = filteredMovies.filter((movie) => {
    return movie.name.toLowerCase().includes(title.toLowerCase());
  });
  if (price) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.price.toString() === price;
    });
  }
  return filteredMovies;
};
