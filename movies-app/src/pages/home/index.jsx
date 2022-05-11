import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Typography} from '@material-ui/core';
import {getStudiosState} from '../../redux/sagas/studios/studios.selectors';
import {getStudios} from '../../redux/sagas/studios/studios.actions';
import {
  getMovies,
  getMoviesGenres
} from '../../redux/sagas/movies/movies.actions';
import {
  getMoviesGenresState,
  getMoviesState
} from '../../redux/sagas/movies/movies.selectors';
import FilterMovies from '../../components/organisms/FilterMovies';
import MoviesList from '../../components/molecules/MoviesList';
import Footer from '../../components/molecules/Footer';
import Header from '../../components/molecules/Header';
import {MainContainer} from './style';

const Home = () => {
  const dispatch = useDispatch();

  const {error, fetching} = useSelector(getStudiosState);
  const {error: moviesError, fetching: moviesFetching} =
    useSelector(getMoviesState);

  const {error: genresError} = useSelector(getMoviesGenresState);

  useEffect(() => {
    dispatch(getStudios());
    dispatch(getMovies());
    dispatch(getMoviesGenres());
  }, [dispatch]);

  if (error || moviesError || genresError) {
    return <Typography>Error getting data, please try again later.</Typography>;
  }

  return (
    <>
      <Header />
      <MainContainer>
        <FilterMovies />

        {fetching || moviesFetching ? (
          <Typography>Loading data...</Typography>
        ) : (
          <MoviesList />
        )}
      </MainContainer>
      <Footer />
    </>
  );
};

export default Home;
