import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { ChangeEvent, Fragment } from 'react';
import tw from 'twin.macro';

import { useAppSelector } from '../../store';
import { Filter } from '../../store/movies/reducer';

const DivFilter = tw.div`grid grid-cols-1 mx-2.5 p-2.5
  border border-gray-500 rounded-md sm:grid-cols-3 sm:gap-5`;

const FilterField = tw.div`mb-2.5 last:mb-0 sm:mb-0`;

const StyledItem = tw(MenuItem)`capitalize`;

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

  return (
    <Fragment>
      <h3>Filters:</h3>
      <DivFilter>
        <FilterField>
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
                <StyledItem key={genre.id} value={genre.id}>
                  {genre.value}
                </StyledItem>
              ))}
            </Select>
          </FormControl>
        </FilterField>
        <FilterField>
          <TextField label="Name" fullWidth onChange={onNameChange} value={filter.name || ''} />
        </FilterField>
        <FilterField tw="flex">
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
        </FilterField>
      </DivFilter>
    </Fragment>
  );
};

export default MovieFilterContent;
