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
    res.status(500).json({ message: "Error in invocation of API: /movies" });
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
    res.status(500).json({ message: "Error in invocation of API: /genres" });
  }
})

app.post('/transfer', function (req, res) {
  try {
    const { movieId, studioId } = req.body;
    const studios = [disney, warner, sony];
    const movieStudio = getMovieStudio(movieId, studios);
    if(movieStudio.id === studioId) 
    throw new Error("Buyer and seller can't be the same");
    const studioTo = getStudio(studioId, studios);
    const {remainingMovies, removedMovie} = removeMovieFromStudio(movieStudio, movieId);
    studioTo.movies.push(removedMovie);
    movieStudio.movies = remainingMovies;
    res.json(getMoviesFromStudios(studios))
  } catch (e) {
    res.status(500).json({ message: "Error in invocation of API: /transfer" });
  }
});

app.listen(3001)
