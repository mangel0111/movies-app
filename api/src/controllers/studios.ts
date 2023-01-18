import { RequestHandler } from 'express';
import { getStudios as getStudiosHelper } from '../helpers';

export const getStudios: RequestHandler = (req, res) => {
  const [disney, warner, sony] = getStudiosHelper();
  const disneyTemp = { ...disney };
  delete disneyTemp.movies;
  const warnerTemp = { ...warner };
  delete warnerTemp.movies;
  const sonyTemp = { ...sony };
  delete sonyTemp.movies;
  res.json([disneyTemp, warnerTemp, sonyTemp]);
};
