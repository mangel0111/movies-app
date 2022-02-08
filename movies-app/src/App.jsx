import './App.css'
import React, { lazy, Suspense } from 'react'
import useResource from './hooks/useResource'
import RESOURCES from './constants/resources'

const MoviesList = lazy(() => import('./components/MoviesList'))

const App = () => {
  const [studios, studiosLoading] = useResource(RESOURCES.studios)
  const [movies, moviesLoading] = useResource(RESOURCES.movies)

  return (
    <div className="App">
      <div className="App-studios App-flex">
        {
          //TODO: 4 Filter the movies by genre, price and title
        }
        <h3>Images:</h3>
        <Suspense fallback={<span>LOADING</span>}>
          {!moviesLoading && !studiosLoading && (
            <MoviesList movies={movies} studios={studios} />
          )}
        </Suspense>
      </div>
    </div>
  )
}

export default App
