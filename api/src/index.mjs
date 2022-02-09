import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import logger from './logger.mjs'
import {
  disney,
  movieAge,
  sony,
  warner,
} from '../constants/studio_constants.mjs'
import { getAllMoviesFromStudios } from '../src/helpers.mjs'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(function (req, res, next) {
  logger.info(`${req.method} ${req.url} ${res.statusCode}`)
  next()
})

app.get('/studios', function (req, res) {
  let disneyTemp = { ...disney }
  delete disneyTemp.movies
  let warnerTemp = { ...warner }
  delete warnerTemp.movies
  let sonyTemp = { ...sony }
  delete sonyTemp.movies
  res.json([disneyTemp, warnerTemp, sonyTemp])
})

app.get('/movies', function (req, res) {
  try {
    res.json(getAllMoviesFromStudios([disney, warner, sony]))
  } catch (e) {
    res.statusCode(500)
  }
})

app.get('/movieAge', function (req, res) {
  res.json(movieAge)
})

//TODO: 1 add the capability to sell the movie rights to another studio
app.post('/transfer', function (req, res) {})

app.listen(3000)
