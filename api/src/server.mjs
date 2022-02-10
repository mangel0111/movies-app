import assert from 'assert'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import logger from './logger.mjs'

import {
  getMovie,
  getAndParseAllMoviesFromStudios,
  getStudioById,
} from './helpers.mjs'

const server = ({ disney, movieAge, sony, warner, studiosMap }) => {
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(function (req, res, next) {
    logger.info(`${req.method} ${req.url} ${res.statusCode}`)
    if (Object.keys(req.body).length > 0) {
      logger.info(`${req.method} Body: ${JSON.stringify(req.body)}`)
    }
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
      res.json(getAndParseAllMoviesFromStudios([disney, warner, sony]))
    } catch (e) {
      res.statusCode(500)
    }
  })

  app.get('/movieAge', function (req, res) {
    res.json(movieAge)
  })

  //TODO: 1 add the capability to sell the movie rights to another studio
  /**
   * NOTE: All id's must be on string
   */
  app.post('/transfer', function (req, res) {
    try {
      const { originId, destinationId, movieId } = req.body
      assert(
        originId && destinationId && movieId,
        'originId, destinationId or movieId not provided'
      )
      // TODO: assert if they are numbers
      assert(
        originId !== destinationId,
        'originId and destionationId must not be equal'
      )

      const originStudio = getStudioById(studiosMap, originId)
      const destionationStudio = getStudioById(studiosMap, destinationId)
      assert(
        originStudio && destionationStudio,
        'originId or destionationId not valid'
      )

      const hasMovie = originStudio.movies.find(
        (_movie) => _movie.id === movieId
      )
      assert(hasMovie, 'originId does not have movieId associated')

      const movie = getMovie(movieId.toString(), studiosMap)
      assert(movie, `No movie was found with id ${movieId}`)

      const newOriginStudio = {
        ...originStudio,
        movies: originStudio.movies.filter((_movie) => _movie.id != movie.id),
      }
      const newDestinationStudio = {
        ...destionationStudio,
        movies: [...destionationStudio.movies, movie],
      }

      // TODO: Remove image from Sony? or keep it?

      // TODO: Should we update constants? I don't think so...
      // We will return the previous studio and new studio
      res.json({
        originStudio: newOriginStudio,
        destinationStudio: newDestinationStudio,
      })
    } catch (error) {
      res.status(500).send(error.message)
    }
  })
  return app
}

export default server
