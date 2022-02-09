import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React, { lazy, Suspense } from 'react'
import RESOURCES from './constants/resources'
import useResource from './hooks/useResource'

const MoviesList = lazy(() => import('./components/MoviesList'))

const useClasses = makeStyles({
  container: {
    height: '100%',
    minHeight: '400px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
  },
  app: {
    // App-flex
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // App-studios
    flexDirection: 'column',
  },
})

const App = () => {
  const classes = useClasses()
  const [studios, studiosLoading] = useResource(RESOURCES.studios)
  const [movies, moviesLoading] = useResource(RESOURCES.movies)

  return (
    <Box className={classes.container}>
      <div className={classes.app}>
        {
          //TODO: 4 Filter the movies by genre, price and title
        }
        <h3>Images:</h3>
        <Suspense fallback={<Typography>LOADING</Typography>}>
          {!moviesLoading && !studiosLoading && (
            <MoviesList movies={movies} studios={studios} />
          )}
        </Suspense>
      </div>
    </Box>
  )
}

export default App
