import './App.css'
import React, { Fragment, useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import MovieItem from './components/MovieItem/MovieItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesRequest, filterMovies } from './store/movies/reducer';
import { fetchStudiosRequest } from './store/studios/reducer';
import Spinner from './components/Spinner';
import MovieFilter from './components/MovieFilter';
import Alert from './components/Alert/Alert';

const App = () => {
  const { movies, loading: moviesLoading } = useSelector((state) => state.movies);
  const { studios, loading: studiosLoading } = useSelector((state) => state.studios);
  const [filter, setFilter] = useState({});
  const dispatch = useDispatch();

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
            {moviesList.map(movie => <MovieItem key={movie.id} movie={movie} />)}
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
