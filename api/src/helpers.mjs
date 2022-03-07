import { GENRE_STRING, sonyImages } from '../constants/studio_constants.mjs'

/**
 *
 * @param {number} movieId
 * @param {any} studios
 * @returns {any | null} movie
 */
export const getMovie = (movieId, studios) => {
  let movie = null

  Object.values(studios).findIndex((_studio) => {
    const _movie = _studio.movies.find((movie) => movie.id === movieId)
    if (_movie) {
      movie = movieConstructor(_movie, _studio)
      return
    }
  })
  if (movie) {
    return movie
  } else {
    return null
  }
}

/**
 * @param {any} studios
 * @param {number} studioId
 * @returns {any | null} studio
 */
export const getStudioById = (studios, studioId) => {
  if (Object.keys(studios).includes(studioId)) {
    const studio = studios[studioId]
    return { ...studio, movies: getAndParseAllMoviesFromStudio(studio) }
  } else {
    return null
  }
}

/**
 *
 * @param {any} studio
 * @returns {any} movie
 */
export const getAndParseAllMoviesFromStudio = (studio) =>
  studio.movies.map((movie) => movieConstructor(movie, studio))

export const getAndParseAllMoviesFromStudios = (studios) => {
  let allMovies = []
  studios.forEach((singleStudio) => {
    singleStudio.movies.map((movie) => {
      allMovies.push(movieConstructor(movie, singleStudio))
    })
  })
  return allMovies
}

export const movieConstructor = (movie, studio) => {
  //Set url property to img
  if (movie.url) {
    Object.defineProperty(
      movie,
      'img',
      Object.getOwnPropertyDescriptor(movie, 'url')
    )
    delete movie['url']
  }

  // set img property ('sony' case)
  if (!movie.img) {
    Object.defineProperty(
      movie,
      'img',
      Object.getOwnPropertyDescriptor(sonyImages, movie.id)
    )
  }

  //Map position id to string
  else if (typeof movie.position === 'number') {
    movie['position'] = GENRE_STRING[movie.price]
  }
  //Add studioId from parent object
  Object.defineProperty(
    movie,
    'studioId',
    Object.getOwnPropertyDescriptor(studio, 'id')
  )

  return movie
}
