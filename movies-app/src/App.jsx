import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/styles'
import { lazy, Suspense, useContext } from 'react'
import { DataContext } from './contexts/Data'

const MovieFilter = lazy(() => import('./components/MovieFilter'))
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
  const { loading } = useContext(DataContext)
  const classes = useClasses()

  return (
    <Box className={classes.container}>
      <div className={classes.app}>
        <h3>Images:</h3>
        <Suspense fallback={<Typography>LOADING</Typography>}>
          {!loading && (
            <>
              <MovieFilter />
              <MoviesList />
            </>
          )}
        </Suspense>
      </div>
    </Box>
  )
}

export default App
