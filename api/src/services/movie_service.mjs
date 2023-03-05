import logger from "../logger.mjs";
import { allStudios, GENRE_STRING } from "../../constants/studio_constants.mjs";
import { SuccessResponse, ErrorResponse } from './service_response.mjs'

export const transferMovie = (movieId, recipientStudioId) => {
  const getMovieResult = getMovie(movieId, allStudios);
  if (getMovieResult.success) {
    return ErrorResponse(`Movie ${movieId} not found`, 404);
  }

  const { movie, studioId: sellerStudioId } = getMovieResult.value;

  if (sellerStudioId === recipientStudioId) {
    logger.info("tried to transfer movie to itself");
    return SuccessResponse();
  }

  const recipientStudio = allStudios.find(
    (studio) => studio.id === recipientStudioId
  );

  if (!recipientStudio) {
    return ErrorResponse(`Studio ${recipientStudioId} not found.`, 404);
  }

  if (movie.price > recipientStudio.money) {
    logger.error("no funds to complete transaction");
    return ErrorResponse("Insuficcient funds", 400);
  }

  const seller = allStudios.find((studio) => studio.id === sellerStudioId);

  seller.money += movie.price;
  seller.movies = seller.movies.filter(
    (studioMovie) => studioMovie.id !== movie.id
  );

  recipientStudio.money -= movie.price;
  recipientStudio.movies.push(movie);

  return SuccessResponse();
};

export const getMovie = (movieId, studios) => {
  let movie;
  const studio = studios.find((studio) => {
    movie = studio.movies.find((p) => p.id === movieId);
    return movie;
  });

  if (movie && studio) {
    return SuccessResponse({ movie, studioId: studio.id });
  }

  return ErrorResponse(`Movie ${movieId} not found`, 404);
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

  return movie;
};
