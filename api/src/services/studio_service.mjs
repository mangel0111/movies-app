import { sony, warner, disney } from "../../constants/studio_constants.mjs";
import { SuccessResponse } from "./service_response.mjs";

export const getStudios = () => {
  let { movies: _, ...disneyStudio } = disney;
  let { movies: __, ...warnerStudio } = warner;
  let { movies: ___, ...sonyStudio } = sony;

  return SuccessResponse([disneyStudio, warnerStudio, sonyStudio]);
};
