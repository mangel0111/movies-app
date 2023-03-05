import * as studioService from "../services/studio_service.mjs";
import { handleServiceResponse } from "./response_helper.mjs"

export function getStudios(_, res) {
  const studiosResponse = studioService.getStudios();
  handleServiceResponse(studiosResponse, res);
}
