import React from 'react';
import {useDispatch} from 'react-redux';
import Button from '../../atoms/Button';
import {clearFilterMovies} from '../../../redux/sagas/movies/movies.actions';

const ClearFilterButton = ({variant, text, ...props}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearFilterMovies());
  };

  return <Button onClick={handleClick}>Reset filters</Button>;
};

export default ClearFilterButton;
