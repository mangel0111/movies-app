import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import {
  getMoviesFromStudios,
  getMovieStudio,
  getStudio,
  removeMovieFromStudio
} from '../src/helpers.mjs'
import {sony, warner, disney, movieAge, GENRE_STRING} from '../constants/studio_constants.mjs'

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('common'));

const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).send(error.message);
}

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

app.get('/movies', function (req, res, next) {
  res.json(getMoviesFromStudios([disney, warner, sony], req.query))
});

app.get('/movieAge', function (req, res) {
  res.json(movieAge)
});

app.get('/genres', function(req, res, next) {
  const genres = Object.keys(GENRE_STRING).map(key => ({
    key,
    text: GENRE_STRING[key],
  }));
  res.json(genres)
})

app.post('/transfer', function (req, res) {
    const { movieId, studioId } = req.body;
    const studios = [disney, warner, sony];
    const movieStudio = getMovieStudio(movieId, studios);
    if(movieStudio.id === studioId) {
      let error = new Error("Buyer and seller can't be the same");
      error.status = 400;
      throw error;
    }
    const studioTo = getStudio(studioId, studios);
    const {remainingMovies, removedMovie} = removeMovieFromStudio(movieStudio, movieId);
    studioTo.movies.push(removedMovie);
    movieStudio.movies = remainingMovies;
    res.json({ message: 'Book successfully transfered'})
});

app.use(errorHandler);

app.listen(3001)
