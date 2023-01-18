import './MovieFilter.css';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const MovieFilterContent = ({ filter, setFilter }) => {
  const { genres } = useSelector((state) => state.genres);

  const onNumberChange = (key) => (e) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setFilter(prev => ({ ...prev, [key]: value }));
  };

  const onNameChange = (e) => setFilter(prev => ({ ...prev, name: e.target.value }));

  return (
    <Fragment>
      <h3>Filters:</h3>
      <div className="movieFilter">
        <div>
          <FormControl fullWidth>
            <InputLabel id="selGenreLabel">Genre</InputLabel>
            <Select
              id="selGenre"
              data-testid="selGenre"
              labelId="selGenreLabel"
              value={filter.genreId || ''}
              label="Genre"
              onChange={onNumberChange('genreId')}
              displayEmpty
            >
              <MenuItem value={''}><em>All</em></MenuItem>

              {genres.map(genre => (
                <MenuItem className="genre" key={genre.id} value={genre.id}>{genre.value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField label="Name" fullWidth onChange={onNameChange} value={filter.name || ''} />
        </div>
        <div className="prices">
          <TextField fullWidth label="Min Price" value={filter.minPrice || ''} onChange={onNumberChange('minPrice')} />
          <TextField fullWidth label="Max Price" value={filter.maxPrice || ''} onChange={onNumberChange('maxPrice')} />
        </div>
      </div>
    </Fragment>
  );
}

export default MovieFilterContent;
