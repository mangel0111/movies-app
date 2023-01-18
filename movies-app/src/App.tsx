import './App.css';

import { Grid } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';

import Alert from './components/Alert';
import MovieFilter from './components/MovieFilter';
import MovieItem from './components/MovieItem/MovieItem';
import Spinner from './components/Spinner';
import { useAppDispatch, useAppSelector } from './main';
import { fetchMoviesRequest, filterMovies } from './store/movies/reducer';
import { fetchStudiosRequest } from './store/studios/reducer';

const App = () => {
  const { movies, loading: moviesLoading } = useAppSelector((state) => state.movies);
  const { studios, loading: studiosLoading } = useAppSelector((state) => state.studios);
  const [filter, setFilter] = useState({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMoviesRequest());
    dispatch(fetchStudiosRequest());
  }, []);

  if (moviesLoading || studiosLoading) return <Spinner />;

  const moviesList = filterMovies(movies, studios, filter);

  return (
    <Fragment>
      <Alert />
      <div className="App">
        <div className="App-studios App-flex">
          <MovieFilter filter={filter} setFilter={setFilter} />
          <h3>Images:</h3>
          <Grid container justifyContent="center" alignItems="center">
            {moviesList.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
