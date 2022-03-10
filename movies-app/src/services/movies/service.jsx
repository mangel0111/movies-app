import { apiCall } from "../../hooks/useApi";

export const getMovies = () => apiCall(`/movies`);

export const transferMovie = (movieId, movieStudioId, transferStudioId) =>
  apiCall(`/transfer`, {
    body: { movieId, movieStudioId, transferStudioId },
    method: "post",
  });
