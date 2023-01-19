import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { Filter } from '../../store/movies/reducer';
import { fetchMoviesRequest, filterMovies } from '../../store/movies/reducer';
import { fetchStudiosRequest } from '../../store/studios/reducer';
import MovieItem from '../MovieItem';
import Spinner from '../Spinner';

type Props = { filter: Filter };
const MovieList: React.FC<Props> = ({ filter }) => {
  const { movies, loading: moviesLoading } = useAppSelector((state) => state.movies);
  const { studios, loading: studiosLoading } = useAppSelector((state) => state.studios);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMoviesRequest());
    dispatch(fetchStudiosRequest());
  }, []);

  if (moviesLoading || studiosLoading) return <Spinner />;

  const moviesList = filterMovies(movies, studios, filter);

  return (
    <>
      <h3>Images:</h3>
      <Grid container justifyContent="center" alignItems="center">
        {moviesList.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </Grid>
    </>
  );
};

export default MovieList;
