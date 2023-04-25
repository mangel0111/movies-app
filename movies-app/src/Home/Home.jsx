import React, { useState, useCallback } from 'react';
import { useStyles } from './Home.styles';
import FilterSection from '../FilterSection';
import MovieListSection from '../MovieListSection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { useMoviesData, useTransferMovie } from './hooks/useMoviesData';

 
const Home = () => {

  const [filters, setFilters] = useState(undefined);
  const [notification, setNotification] = useState(null);

  const styles = useStyles();

  const onRequestError = useCallback((e) => {
    setNotification({message: e.response?.data || e.message, severity: 'error'});
    console.error(e);
  }, [])

  const { data: movies, isLoading } = useMoviesData(filters, onRequestError);

  const { mutate: transferMovie } = useTransferMovie(
    () => setNotification({message: 'Movie succesfully transfered', severity: 'success'}),
    onRequestError
  );

  const confirmTransfer = (studioId, movieId) => {
    transferMovie({studioId, movieId})
  }

  if (isLoading && !filters) {
    return (
        <div className={styles.spinner}>
            <CircularProgress />
        </div>    
    )
  }

  return (
    <div className={styles.appContainer}>
      <Snackbar
        className={styles[notification?.severity]}
        open={!!notification?.message}
        autoHideDuration={4000}
        message={notification?.message}
        onClose={() => setNotification(null)}
      />
      <div className={styles.appFlex}>
        <FilterSection setFilterValues={setFilters} filterValues={filters} />
        {isLoading ? <div className={styles.spinner}>
            <CircularProgress />
        </div> : <MovieListSection 
          movies={movies} 
          confirm={confirmTransfer}
          showNoResults={!!filters}
        />}
      </div>
    </div>
  )
}
 
export default Home;