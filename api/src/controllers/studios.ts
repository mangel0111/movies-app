import { getStudios as getStudiosHelper } from "../helpers";

export const getStudios = (req, res) => {
  const [disney, warner, sony] = getStudiosHelper();
  let disneyTemp = {...disney}
  delete disneyTemp.movies
  let warnerTemp = {...warner}
  delete warnerTemp.movies
  let sonyTemp = {...sony}
  delete sonyTemp.movies
  res.json([ disneyTemp, warnerTemp, sonyTemp ]);
};
