import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {getAllMoviesFromStudios, getGenres, transferStudio} from '../src/helpers.mjs';
import {sony, warner, disney, movieAge, GENRE_STRING} from '../constants/studio_constants.mjs';
import {createLogger} from 'bunyan';
import bformat from 'bunyan-format';

console.clear();

process.env.PORT = 8080;

const formatOut = bformat({ outputMode: 'short' });
const log = createLogger({
  name: 'Request',
  src: true,
  stream: formatOut,
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

const logger = (req, _, next) => {
  const createLog = (req) => ({
    headers: req.headers,
    path: req.path,
    method: req.method,
    ...(req.body && { body: req.body }),
  });

  log.info('Request', createLog(req));

  next();
};

app.use(logger);


app.get('/studios', function (req, res) {
  let disneyTemp = {...disney}
  delete disneyTemp.movies
  let warnerTemp = {...warner}
  delete warnerTemp.movies
  let sonyTemp = {...sony}
  delete sonyTemp.movies
  res.json([
    disneyTemp,
    warnerTemp,
    sonyTemp
  ])
});

app.get('/movies', function (req, res) {
  try {
    res.json(getAllMoviesFromStudios([disney, warner, sony]))
  } catch (e) {
    res.statusCode(500)
  }
});

app.get('/genres', function (req, res) {
  res.json(getGenres(GENRE_STRING));
});

app.get('/movieAge', function (req, res) {
  res.json(movieAge)
});

app.post('/transfer', function (req, res) {
  const { from, to, movieId } = req.body;

  transferStudio(from, to, movieId);

  res.json({
    status: 200
  });
});

app.listen(process.env.PORT);
