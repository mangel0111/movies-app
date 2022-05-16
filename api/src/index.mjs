import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import { getAllMoviesFromStudios, getAllGenres, transferMovie, logger } from '../src/helpers.mjs'
import { sony, warner, disney, movieAge } from '../constants/studio_constants.mjs'

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
  logger.info(`${req.method} ${req.url} ${res.statusCode}`)
  if (Object.keys(req.body).length) {
    logger.info(`${req.method} Body: ${JSON.stringify(req.body)}`)
  }
  next()
})

app.get('/studios', function (req, res) {
  try {
    let disneyTemp = { ...disney }
    delete disneyTemp.movies
    let warnerTemp = { ...warner }
    delete warnerTemp.movies
    let sonyTemp = { ...sony }
    delete sonyTemp.movies
    res.json([
      disneyTemp,
      warnerTemp,
      sonyTemp
    ])
  } catch {
    res.status(500);
  }
});

app.get('/movies', function (req, res) {
  try {
    const response = getAllMoviesFromStudios([disney, warner, sony]);
    res.json(response);
  } catch {
    res.status(500);
  }
});

app.get('/genres', function (req, res) {
  try {
    res.json(getAllGenres())
  } catch {
    res.status(500)
  }
});

app.get('/movieAge', function (req, res) {
  res.json(movieAge)
});

app.post('/transfer', function (req, res) {
  try {
    const { movieId, sellerId, buyerId } = req.body;
    if (!movieId || !sellerId || !buyerId) {
      throw new Error('Missing 1 or more parameter.');
    }
    const studios = [disney, sony, warner];
    transferMovie(movieId, sellerId, buyerId, studios);
    res.sendStatus(204);
  } catch {
    res.status(500);
  }
});
