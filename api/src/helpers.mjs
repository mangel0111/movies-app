import {
  GENRE_STRING,
  sony,
  sonyImages,
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

export const getAllMoviesFromStudios = (studios) => {
  let allMovies = [];
  studios.forEach((singleStudio) => {
    singleStudio.movies.map((movie) => {
      allMovies.push(movieConstructor(movie, singleStudio));
    });
  });
  return allMovies;
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

  //Map genre id to string
  if (typeof movie.genre === "number") {
    movie["genre"] = GENRE_STRING[movie.genre];
  }

  //Add studioId from parent object
  Object.defineProperty(
    movie,
    "studioId",
    Object.getOwnPropertyDescriptor(studio, "id")
  );

  //Add studioName from parent object
  Object.defineProperty(
    movie,
    "studioName",
    Object.getOwnPropertyDescriptor(studio, "name")
  );

  if (!movie.url && !movie.img && studio.id === sony.id) {
    movie.img = sonyImages[movie.id];
  }

  return movie;
};

export const almostTransferMovie = ({
  movieId,
  movieStudioId,
  transferStudioId,
}) => {
  if (!movieId) {
    throw new Error("Movie id not found!");
  }
  if (!movieStudioId) {
    throw new Error("Movie Studio Id not found!");
  }
  if (!transferStudioId) {
    throw new Error("Transfer Studio Id not found");
  }

  const movie = studiosMap[movieStudioId].movies.filter(
    (movie) => movie.id === movieId
  );
  const actualMovieIndex = studiosMap[movieStudioId].movies.indexOf(movie);
  studiosMap[movieStudioId].movies.splice(actualMovieIndex, 1);
  studiosMap[transferStudioId].movies.push(movie);
  return studiosMap;
};
