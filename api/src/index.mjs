import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import {getMoviesFromStudios} from '../src/helpers.mjs'
import {sony, warner, disney, movieAge, GENRE_STRING} from '../constants/studio_constants.mjs'

const app = express();

app.use(cors());
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
    res.json(getMoviesFromStudios([disney, warner, sony], req.query))
  } catch (e) {
    res.statusCode = 500;
  }
});

app.get('/movieAge', function (req, res) {
  res.json(movieAge)
});

app.get('/genres', function(req, res) {
  try {
    const genres = Object.keys(GENRE_STRING).map(key => ({
      key,
      text: GENRE_STRING[key],
    }));
    res.json(genres)
  } catch (e) {
    res.statusCode = 500;
  }
})

//TODO: 1 add the capability to sell the movie rights to another studio
app.post('/transfer', function (req, res) {
});

// TODO: 2 Add logging capabilities into the movies-app

app.listen(3001)
