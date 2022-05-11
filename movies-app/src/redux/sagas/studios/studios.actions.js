export const GET_STUDIOS = 'GET_STUDIOS';
export const GET_STUDIOS_SUCCESS = 'GET_STUDIOS_SUCCESS';
export const GET_STUDIOS_FAILURE = 'GET_STUDIOS_FAILURE';

export const SELL_STUDIO_MOVIE = 'SELL_STUDIO_MOVIE';
export const SELL_STUDIO_MOVIE_SUCCESS = 'SELL_STUDIO_MOVIE_SUCCESS';
export const SELL_STUDIO_MOVIE_FAILURE = 'SELL_STUDIO_MOVIE_FAILURE';
export const SELL_STUDIO_MOVIE_CLEAN = 'SELL_STUDIO_MOVIE_CLEAN';

export const getStudios = () => ({
  type: GET_STUDIOS
});

export const sellStudioMovie = (movieId, studioId, buyerStudioId) => ({
  type: SELL_STUDIO_MOVIE,
  payload: {
    movieId,
    studioId,
    buyerStudioId
  }
});

export const resetTransaction = () => ({
  type: SELL_STUDIO_MOVIE_CLEAN
});
