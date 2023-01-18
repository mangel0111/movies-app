import './MovieFilter.css';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { ChangeEvent, Fragment } from 'react';

import { useAppSelector } from '../../main';
import { Filter } from '../../store/movies/reducer';

type Props = { filter: Filter; setFilter: React.Dispatch<React.SetStateAction<Filter>> };
const MovieFilterContent: React.FC<Props> = ({ filter, setFilter }) => {
  const { genres } = useAppSelector((state) => state.genres);

  const onPriceChange = (key: keyof Filter) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setFilter((prev: Filter) => ({ ...prev, [key]: value }));
  };

  const onGenreChange = (e: SelectChangeEvent) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setFilter((prev: Filter) => ({ ...prev, genreId: value }));
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilter((prev) => ({ ...prev, name: e.target.value }));

  console.log(filter);

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
              value={filter.genreId?.toString() || ''}
              label="Genre"
              onChange={onGenreChange}
              displayEmpty>
              <MenuItem value={''}>
                <em>All</em>
              </MenuItem>

              {genres.map((genre) => (
                <MenuItem className="genre" key={genre.id} value={genre.id}>
                  {genre.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField label="Name" fullWidth onChange={onNameChange} value={filter.name || ''} />
        </div>
        <div className="prices">
          <TextField
            fullWidth
            label="Min Price"
            value={filter.minPrice || ''}
            onChange={onPriceChange('minPrice')}
          />
          <TextField
            fullWidth
            label="Max Price"
            value={filter.maxPrice || ''}
            onChange={onPriceChange('maxPrice')}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default MovieFilterContent;
