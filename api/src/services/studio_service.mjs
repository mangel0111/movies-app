import { sony, warner, disney } from "../../constants/studio_constants.mjs";

export const getStudios = () => {
  let { movies: _, ...disneyStudio } = disney;
  let { movies: __, ...warnerStudio } = { ...warner };
  let { movies: ___, ...sonyStudio } = { ...sony };

  return [disneyStudio, warnerStudio, sonyStudio];
};
