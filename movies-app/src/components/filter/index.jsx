/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Select, MenuItem, InputLabel, TextField, InputAdornment, Button,
} from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Refresh from '@material-ui/icons/Refresh';
import { globalApp } from 'redux/reducers/global-app';
import Box from 'components/styled/box';
import FormControl from 'components/styled/form-control';
import { selectSelectedGenre } from 'redux/selectors/global-app';
import { selectGenresData } from 'redux/selectors/genres';
import {
  ALL, ALL_GENRES, GENRE, MAX_PRICE, MIN_PRICE, RESET_FILTERS, TITLE,
} from 'utils/constants';
import { getTextFieldCommonProps } from 'utils/helpers';
import InputsContainer from 'components/styled/inputs-container';

const Filter = () => {
  const dispatch = useDispatch();
  const genresData = useSelector(selectGenresData, shallowEqual);
  const selectedGenre = useSelector(selectSelectedGenre, shallowEqual);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [titleText, setTitleText] = useState('');

  const handleGenreChange = ({ target: { value } }) => {
    const genre = value === 0 ? ALL_GENRES : genresData.find((item) => item.id === value);
    dispatch(globalApp.setSelectedGenre(genre));
  };

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') {
      dispatch(globalApp.setMinPrice(minPrice));
      dispatch(globalApp.setMaxPrice(maxPrice));
      dispatch(globalApp.setTitleText(titleText));
    }
  };

  const handleResetFiltersClick = () => {
    setMinPrice('');
    setMaxPrice('');
    setTitleText('');
    dispatch(globalApp.resetFilters());
  };

  const adornment = <InputAdornment position="start">$</InputAdornment>;

  return (
    <Box>
      <InputsContainer>
        <FormControl>
          <InputLabel id="select-genre-label">{GENRE}</InputLabel>
          <Select
            labelId="select-genre-label"
            id="select-genre"
            value={selectedGenre?.id}
            onChange={handleGenreChange}
          >
            <MenuItem
              value={0}
            >
              {ALL}
            </MenuItem>
            {genresData.map((genre) => (
              <MenuItem
                key={genre.id}
                value={genre.id}
              >
                {genre.desc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            {...getTextFieldCommonProps(MIN_PRICE, 'number', handleKeyDown, adornment)}
            onChange={({ target: { value } }) => setMinPrice(value)}
            value={minPrice}
          />
        </FormControl>
        <FormControl>
          <TextField
            {...getTextFieldCommonProps(MAX_PRICE, 'number', handleKeyDown, adornment)}
            onChange={({ target: { value } }) => setMaxPrice(value)}
            value={maxPrice}
          />
        </FormControl>
        <FormControl>
          <TextField
            {...getTextFieldCommonProps(TITLE, 'text', handleKeyDown)}
            onChange={({ target: { value } }) => setTitleText(value)}
            value={titleText}
          />
        </FormControl>
      </InputsContainer>
      <Button variant="contained" endIcon={<Refresh />} onClick={handleResetFiltersClick} data-testid="reset-filters-button">
        {RESET_FILTERS}
      </Button>
    </Box>
  );
};

export default Filter;
