import React, {useState, useEffect} from 'react';
import { useStyles } from './App.styles';
import FilterSection from './FilterSection';
import api from './api';
import MovieListSection from './MovieListSection';
import Snackbar from '@material-ui/core/Snackbar';
 
const App = () => {
  const [studios, setStudios] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState(undefined);
  const [transferData, setTransferData] = useState(null);
  const [notification, setNotification] = useState(null);

  const styles = useStyles();

  useEffect(() => {
    fetchData().catch((e) => {
      setNotification({message: 'An error ocurred when fetching data', severity: 'error'});
      console.error(e);
    });
  }, []);

  useEffect(() => {
    if(filters){
      filterData(filters).catch((e) => {
        setNotification({message: 'An error ocurred when filtering', severity: 'error'});
        console.error(e);
      }
      );
    }
  }, [filters]);

  useEffect(() => {
    if(transferData){
      postMovie(transferData);
    }
  }, [transferData]);

  const filterData = async (filters) => {
    const filteredData = await api.getMovies(filters);

    setMovies(filteredData);
  };

  const fetchData = async () => {
    const studiosData = await api.getStudios();
    setStudios(studiosData);

    const moviesData = await api.getMovies();
    setMovies(moviesData);
  };

  const postMovie = async (transferData) => {
      try{
        await api.transferMovie(transferData);
        const movies = await api.getMovies(filters);
        setMovies(movies);
        setNotification({message: 'Movie Transfered', severity: 'success'});
      }catch(e){
        setNotification({message: e.response?.data || e.message, severity: 'error'});
        console.error(e)
      }
  }

  const confirmTransfer = (studioId, movieId) => {
    setTransferData({studioId, movieId})
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
        <MovieListSection 
          movies={movies} 
          studios={studios}
          confirm={confirmTransfer}
          showNoResults={!!filters}
        />
      </div>
    </div>
  )
}
 
export default App;