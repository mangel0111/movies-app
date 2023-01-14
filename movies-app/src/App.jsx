import './App.css'
import React from 'react'
import {Grid} from '@material-ui/core'
import MovieItem from './components/MovieItem/MovieItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesRequest } from './store/movies/reducer';
import { fetchStudiosRequest } from './store/studios/reducer';
import Spinner from './components/Spinner';

const App = () => {
  const { movies, loading: moviesLoading } = useSelector((state) => state.movies);
  const { studios, loading: studiosLoading } = useSelector((state) => state.studios);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesRequest());
    dispatch(fetchStudiosRequest());
  }, []);

  if (moviesLoading || studiosLoading) return <Spinner />;

  const moviesList = movies.map(movie => ({
    ...movie,
    studio: studios.find(studio => movie.studioId === studio.id)?.name,
  }));

  return (
    <div className="App">
      <div className="App-studios App-flex"> {
        //TODO: 4 Filter the movies by genre, price and title
      }
        <h3>Images:</h3>
        <Grid container justifyContent="center" alignItems="center">
          {moviesList.map(movie => <MovieItem key={movie.name} movie={movie} />)}
        </Grid>
      </div>
    </div>
  );
};

export default App;
