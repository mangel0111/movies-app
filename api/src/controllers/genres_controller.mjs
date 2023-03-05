import * as genreService from "../services/genre_service.mjs"
import { handleServiceResponse } from "./response_helper.mjs"

export function getGenre(_, res) {
  const genresResponse = genreService.getGenres();
  handleServiceResponse(genresResponse, res)
}
