import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ClearFilterButton from '../../molecules/ClearFilterButton';
import {
  getMoviesData,
  getMoviesFilterStatus,
  getMoviesGenresData
} from '../../../redux/sagas/movies/movies.selectors';
import {
  filterMoviesAction,
  resetFilterStatus
} from '../../../redux/sagas/movies/movies.actions';
import {filterMovies} from './utils';
import {InputContainer, StyledFilter} from './style';

const FilterMovies = () => {
  const dispatch = useDispatch();
  const [genreFilter, setGenreFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const {resetFilter} = useSelector(getMoviesFilterStatus);
  const {movies} = useSelector(getMoviesData);
  const {genres} = useSelector(getMoviesGenresData);

  useEffect(() => {
    if (resetFilter) {
      setGenreFilter('');
      setMinPrice('');
      setMaxPrice('');
      dispatch(resetFilterStatus());
    }
  }, [dispatch, resetFilter]);

  const handleSelect = ({target}) => {
    setGenreFilter(target.value);
    const filter = filterMovies(movies, minPrice, maxPrice, target.value);
    dispatch(filterMoviesAction(filter));
  };

  const handlePrice = (criteria, {target}) => {
    let filter = '';
    if (criteria === 'minPrice') {
      setMinPrice(target.value);
      filter = filterMovies(movies, target.value, maxPrice, genreFilter);
    } else {
      setMaxPrice(target.value);
      filter = filterMovies(movies, minPrice, target.value, genreFilter);
    }
    dispatch(filterMoviesAction(filter));
  };

  const renderOptions = (option, index) => (
    <MenuItem value={option.value} key={`select-option-${index}`}>
      {option.label}
    </MenuItem>
  );

  return (
    <FormControl fullWidth>
      <StyledFilter>
        <div>
          <FormHelperText style={{padding: 0, margin: 0}}>Genre</FormHelperText>
          <Select
            style={{width: '100%'}}
            label="Genre"
            id="filter-movies-select"
            value={genreFilter}
            onChange={handleSelect}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genres.map(renderOptions)}
          </Select>
          <FormHelperText>Choose one to filter movies</FormHelperText>
        </div>
        <InputContainer>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            type="number"
            label="Min Price"
            value={minPrice}
            onChange={(e) => handlePrice('minPrice', e)}
          />
          <FormHelperText>Fill min price to filter movies</FormHelperText>
        </InputContainer>
        <InputContainer>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            type="number"
            label="Max Price"
            value={maxPrice}
            onChange={(e) => handlePrice('maxPrice', e)}
          />
          <FormHelperText>Fill max price to filter movies</FormHelperText>
        </InputContainer>
        <InputContainer>
          <ClearFilterButton />
        </InputContainer>
      </StyledFilter>
    </FormControl>
  );
};

export default FilterMovies;
