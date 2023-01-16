import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import {getAllMoviesFromStudios, sleep} from '../src/helpers.mjs'
import {sony, warner, disney, movieAge, GENRE_ID} from '../constants/studio_constants.mjs'
import logger from './util/logger.mjs';

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet()); // helmet adds many response headers to improve security (Vulnerabilities fix. Source: https://helmetjs.github.io/)
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.json());

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
    const movies = getAllMoviesFromStudios([disney, warner, sony]);
    // await sleep(10000);  // add async above. this allowed me to test loading state in frontend
    res.json(movies);
  } catch (e) {
    res.statusCode(500)
  }
});

app.get('/genres', function (req, res) {
  try {
    const genres = Object.keys(GENRE_ID)
      .map(key => ({ id: GENRE_ID[key], value: key }))
      .sort((a, b) => a.value > b.value ? 1 : -1);
    res.json(genres);
  } catch (e) {
    res.statusCode(500)
  }
});

app.get('/movieAge', function (req, res) {
  res.json(movieAge)
});

//TODO: 1 add the capability to sell the movie rights to another studio
app.post('/transfer', function (req, res) {


});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info('SERVER READY');
  logger.info(`Listening on port ${port}`);
});
