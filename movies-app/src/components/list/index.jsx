import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { globalApp } from 'redux/reducers/global-app';
import { getFilteredMovies, getFormattedPrice, getStudioDataFromMovie } from 'utils/helpers';
import { selectMoviesData } from 'redux/selectors/movies';
import { selectStudiosData } from 'redux/selectors/studios';
import Avatar from 'components/avatar';
import {
  selectMaxPrice,
  selectMinPrice, selectSelectedGenre, selectTitleText,
} from 'redux/selectors/global-app';
import Card from 'components/styled/card';
import { MOVIE_NOT_FOUND } from 'utils/constants';

const List = () => {
  const dispatch = useDispatch();
  const moviesData = useSelector(selectMoviesData, shallowEqual);
  const studiosData = useSelector(selectStudiosData, shallowEqual);
  const selectedGenre = useSelector(selectSelectedGenre, shallowEqual);
  const selectedTitleText = useSelector(selectTitleText, shallowEqual);
  const selectedMinPrice = useSelector(selectMinPrice, shallowEqual);
  const selectedMaxPrice = useSelector(selectMaxPrice, shallowEqual);
  const [filteredData, setFilteredData] = useState([]);

  const handleMovieClick = (id) => {
    dispatch(globalApp.setSelectedMovie(id));
  };

  useEffect(() => {
    setFilteredData(
      getFilteredMovies(
        moviesData,
        selectedGenre,
        selectedTitleText,
        selectedMinPrice,
        selectedMaxPrice,
      ),
    );
  }, [moviesData, selectedGenre, selectedTitleText, selectedMinPrice, selectedMaxPrice]);

  return (
    <Grid container justifyContent={filteredData.length ? 'flex-start' : 'center'} alignItems="center" spacing={2}>
      {filteredData.length ? filteredData.map((movie) => (
        <Grid item xs={12} sm={6} lg={4} key={movie.id} onClick={() => handleMovieClick(movie.id)} data-testid={`grid-movie-${movie.id}`}>
          <Card $hoverable>
            <Avatar
              name={movie.name}
              img={movie.img}
            />
            <Typography variant="h6">
              <strong>{movie.name}</strong>
            </Typography>

            <Avatar
              alt={getStudioDataFromMovie(movie, studiosData)?.name}
              img={getStudioDataFromMovie(movie, studiosData)?.logo}
              isLogo
            />
            <Typography variant="caption">
              {getStudioDataFromMovie(movie, studiosData)?.name}
            </Typography>
            <Typography variant="subtitle2">
              <strong>{getFormattedPrice(movie.price)}</strong>
            </Typography>
          </Card>
        </Grid>
      )) : <span>{MOVIE_NOT_FOUND}</span>}
    </Grid>
  );
};

export default List;
