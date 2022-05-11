const isMinPrice = (movie, min) => movie.price >= min;
const isMaxPrice = (movie, max) => movie.price <= max;
const isGenre = (movie, genre) => movie.genre === genre;

export const filterMovies = (movies, min, max, genre) => {
  if (!min && !max && !genre) {
    return movies;
  }
  if (!genre) {
    if (!min && max) {
      return movies.filter((movie) => isMaxPrice(movie, max));
    }
    if (min && !max) {
      return movies.filter((movie) => isMinPrice(movie, min));
    }
    if (min && max) {
      return movies.filter(
        (movie) => isMinPrice(movie, min) && isMaxPrice(movie, max)
      );
    }
  } else if (genre && !min && !max) {
    return movies.filter((movie) => isGenre(movie, genre));
  } else if (genre && !min && max) {
    return movies.filter(
      (movie) => isGenre(movie, genre) && isMaxPrice(movie, max)
    );
  } else if (genre && min && !max) {
    return movies.filter(
      (movie) => isGenre(movie, genre) && isMinPrice(movie, min)
    );
  } else if (genre && min && max) {
    return movies.filter(
      (movie) =>
        isGenre(movie, genre) &&
        isMinPrice(movie, min) &&
        isMaxPrice(movie, max)
    );
  } else {
    return movies;
  }
};
