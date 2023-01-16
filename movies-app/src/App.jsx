import './App.css'
import React from 'react'
import {Grid} from '@material-ui/core'
import MovieItem from './components/MovieItem/MovieItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesRequest, filterMovies } from './store/movies/reducer';
import { fetchStudiosRequest } from './store/studios/reducer';
import Spinner from './components/Spinner';
import MovieFilter from './components/MovieFilter';
import { useState } from 'react';

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
    <div className="App">
      <div className="App-studios App-flex">
        <MovieFilter filter={filter} setFilter={setFilter} />
        <h3>Images:</h3>
        <Grid container justifyContent="center" alignItems="center">
          {moviesList.map(movie => <MovieItem key={movie.id} movie={movie} />)}
        </Grid>
      </div>
    </div>
  );
};

export default App;
