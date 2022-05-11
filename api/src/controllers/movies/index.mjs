import log4js from 'log4js';
import {
  disney,
  GENRE_ID,
  movieAge,
  sony,
  warner
} from '../../../constants/studio_constants.mjs';
import {getAllMoviesFromStudios, mapGenres} from './utils.mjs';

const logger = log4js.getLogger();

export const getAllMovies = (req, res) => {
  try {
    const response = getAllMoviesFromStudios([disney, warner, sony]);
    logger.debug(response);
    res.json(response);
  } catch (e) {
    logger.error(e);
    res.statusCode = 500;
    res.send(e);
  }
};

export const getMoviesAge = (req, res) => {
  res.json(movieAge);
};

export const getMoviesGenres = (req, res) => {
  try {
    const response = mapGenres(GENRE_ID);
    logger.debug(response);
    res.json(response);
  } catch (e) {
    logger.error(e);
    res.statusCode = 500;
    res.send(e);
  }
};
