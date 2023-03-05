import { GENRE_ID } from "../../constants/studio_constants.mjs";
import { SuccessResponse } from "./service_response.mjs";

export function getGenres() {
  const genres = Object.entries(GENRE_ID).map((genre) => ({
    id: genre[1],
    name: genre[0],
  }));

  return SuccessResponse(genres);
}
