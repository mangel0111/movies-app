import { getMovie } from "../helpers.mjs";
import logger from "../logger.mjs";
import { allStudios } from "../../constants/studio_constants.mjs";

/* const validateTransfer */

export const transferMovie = (movieId, recipientStudioId) => {
  const { movie, studioId: sellerStudioId } = getMovie(movieId, allStudios);
  if (!movie) {
    return ErrorResponse(`Movie ${movieId} not found`, 404);
  }

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

function ErrorResponse(message, status) {
  return {
    success: false,
    message,
    status,
  };
}

function SuccessResponse(value, status = 200) {
  return {
    success: true,
    value,
    status,
  };
}
