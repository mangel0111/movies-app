import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { getAllMoviesFromStudios, genreListConstructor } from '../src/helpers.mjs'
import { sony, warner, disney, movieAge, studiosMap } from '../constants/studio_constants.mjs'

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.get('/studios', function (req, res) {
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
});

app.get('/movies', function (req, res) {
  try {
    const params = {
      genreId: req.query.genreId,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      title: req.query.title
    }
    res.json(getAllMoviesFromStudios([disney, warner, sony], params))
  } catch (e) {
    res.statusCode(500)
  }
});

app.get('/genres', function (req, res) {
  try {

    res.json(genreListConstructor())
  } catch (e) {
    res.statusCode(500)
  }
})

app.get('/movieAge', function (req, res) {
  res.json(movieAge)
});

app.post('/transfer', function (req, res) {
  const { movieId, movieStudioId, nextStudioId } = req.body
  if (req.method === 'POST') {
    const movie = studiosMap[movieStudioId].movies.filter(movie => movie.id === movieId)[0]
    const movieIndex = studiosMap[movieStudioId].movies.indexOf(movie)
    studiosMap[movieStudioId].movies.splice(movieIndex,1)
    studiosMap[nextStudioId].money -= movie.price 
    studiosMap[nextStudioId].movies.push(movie)
    res.json({movies: getAllMoviesFromStudios(Object.values(studiosMap), {}), studios: Object.values(studiosMap)})
  }
});

app.listen(3030)
