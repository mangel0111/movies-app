import log4js from 'log4js';
import {disney, sony, warner} from '../../../constants/studio_constants.mjs';
import {updateStudio} from './utils.mjs';

const logger = log4js.getLogger();

export const getAllStudios = (req, res) => {
  let disneyTemp = {...disney};
  delete disneyTemp.movies;
  let warnerTemp = {...warner};
  delete warnerTemp.movies;
  let sonyTemp = {...sony};
  delete sonyTemp.movies;
  res.json([disneyTemp, warnerTemp, sonyTemp]);
};

export const transferStudio = (req, res) => {
  try {
    const {movieId, studioId, buyerStudioId} = req.body;
    if (!movieId || !studioId || !buyerStudioId) {
      throw new Error('Missing parameters');
    }
    const studios = [disney, sony, warner];
    const response = updateStudio(movieId, studioId, buyerStudioId, studios);
    logger.debug(response);
    res.json(response);
  } catch (e) {
    logger.error(e);
    res.statusCode = 500;
    res.send(e);
  }
};
