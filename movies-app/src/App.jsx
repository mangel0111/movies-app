import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React, { lazy, Suspense } from 'react'
import MovieFilter from './components/MovieFilter'
import RESOURCES from './constants/resources'
import useFilter from './hooks/useFilter'
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

// TODO: we don't have price, but we have 'money', but it makes no sense to filter by
// the studio's money
// const fields = { name: 'string', genre: 'string', price: 'number' }
const fields = { name: 'string', genre: 'string' }

const App = () => {
  const classes = useClasses()
  const [studios, studiosLoading] = useResource(RESOURCES.studios)
  const [rawMovies, moviesLoading] = useResource(RESOURCES.movies)
  const {
    data: movies,

    handleChange,
  } = useFilter({
    data: rawMovies,
    fields,
  })

  return (
    <Box className={classes.container}>
      <div className={classes.app}>
        <MovieFilter fields={Object.keys(fields)} handleChange={handleChange} />
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
