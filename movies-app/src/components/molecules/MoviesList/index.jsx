import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMoviesData} from '../../../redux/sagas/movies/movies.selectors';
import Grid from '@material-ui/core/Grid';
import Typography from '../../atoms/Typography';
import MoviesItem from '../MoviesItem';
import Container from '../../atoms/Container';
import SellMovieModal from '../../organisms/SellMovieModal';
import {getMovies} from '../../../redux/sagas/movies/movies.actions';
import {getStudios} from '../../../redux/sagas/studios/studios.actions';

const MoviesList = () => {
  const dispatch = useDispatch();
  const {filteredMovies} = useSelector(getMoviesData);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleClickItem = (movie) => {
    setShowModal(!showModal);
    setSelectedMovie(movie);
  };

  const handleClose = (refresh) => {
    setShowModal(!showModal);
    setSelectedMovie(null);
    refresh && dispatch(getMovies()) && dispatch(getStudios());
  };

  if (!filteredMovies.length) {
    return (
      <Container>
        <Typography paragraph>No movies found</Typography>
      </Container>
    );
  }
  const renderItems = (movie) => (
    <MoviesItem
      key={`movie-item-${movie.id}`}
      item={movie}
      handleClickItem={handleClickItem}
      selectedMovie={selectedMovie}
    />
  );

  return (
    <div>
      <Grid container>{filteredMovies.map(renderItems)}</Grid>
      {showModal && (
        <SellMovieModal
          open={showModal}
          handleClose={handleClose}
          movie={selectedMovie}
        />
      )}
    </div>
  );
};
export default MoviesList;
