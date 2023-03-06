import React, {useState, useEffect} from 'react';
import { useStyles } from './App.styles';
import FilterSection from './FilterSection';
import api from './api';
import MovieListSection from './MovieListSection';
 
const App = () => {
  const [studios, setStudios] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState(undefined);
  const [transferData, setTransferData] = useState(null);

  const styles = useStyles();

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if(filters){
      filterData(filters).catch(console.error);
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
      }catch(e){
        console.error(e)
      }
  }

  const confirmTransfer = (studioId, movieId) => {
    setTransferData({studioId, movieId})
  }

  return (
    <div className={styles.appContainer}>
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