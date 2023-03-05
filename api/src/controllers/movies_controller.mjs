import { handleServiceResponse } from './response_helper.mjs'
import { sony, warner, disney } from "../../constants/studio_constants.mjs";
import * as movieService from "../services/movie_service.mjs";

export function getMovies(_, res) {
  try {
    res.json(movieService.getAllMoviesFromStudios([disney, warner, sony]));
  } catch (e) {
    res.status(500);
  }
}

export function transferMovie(request, res) {
  const movieId = request.params.id;
  const { studioId } = request.body;
  const result = movieService.transferMovie(movieId, studioId);

  handleServiceResponse(result, res);
}
