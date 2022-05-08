import {
  GENRE_ID,
  GENRE_STRING,
  studiosMap,
} from "../constants/studio_constants.mjs";

export const getMovie = (movieId, studios) => {
  let movie;
  let studio = studios.find((t) => {
    movie = t.movies.find((p) => p.id === movieId);
    return movie;
  });
  if (movie && studio) {
    return { movie, studioId: studio.id };
  }

  return false;
};

export const getAllMoviesFromStudios = (studios, filter) => {
  let allMovies = [];
  studios.forEach((singleStudio) => {
    singleStudio.movies.map((movie) => {
      allMovies.push(movieConstructor(movie, singleStudio));
    });
  });
  if (filter) return filterMovies(allMovies, filter);
  return allMovies;
};

const filterMovies = (movies, filter) => {
  const { genre, title, price } = filter;
  let filteredMovies = movies;
  if (genre !== "all") {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.genre === genre;
    });
  }
  if (title) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.name.toLowerCase().includes(title.toLowerCase());
    });
  }
  if (price) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.price.toString() === price;
    });
  }
  return filteredMovies;
};

export const movieConstructor = (movie, studio) => {
  //Set url property to img
  if (movie.url) {
    Object.defineProperty(
      movie,
      "img",
      Object.getOwnPropertyDescriptor(movie, "url")
    );
    delete movie["url"];
  }
  //Map position id to string
  else if (typeof movie.position === "number") {
    movie["position"] = GENRE_STRING[movie.price];
  }
  //Add studioId from parent object
  Object.defineProperty(
    movie,
    "studioId",
    Object.getOwnPropertyDescriptor(studio, "id")
  );
  //Remove non wanted properties
  // delete movie['price'];
  // delete movie["id"];

  return movie;
};

export const getGenres = () => {
  return GENRE_ID;
};

export const transferMovie = (movieId, studioId) => {
  let transferred = false;
  const studios = Object.values(studiosMap);
  studios.forEach((studio) => {
    if (studio.id === studioId) return;
    const movieIndex = studio.movies.findIndex((movie) => movie.id === movieId);
    if (movieIndex >= 0) {
      const movie = studio.movies[movieIndex];
      studio.movies.splice(movieIndex, 1);
      studiosMap[studioId].movies.push(movie);
      transferred = true;
    }
  });
  return transferred;
};
