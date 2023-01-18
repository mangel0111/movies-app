import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { FormEvent, Fragment, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../main';
import { fetchMoviesRequest, MovieExt } from '../../../store/movies/reducer';
import { postTransferMovie } from '../../../store/movies/services';
import { fetchStudiosRequest } from '../../../store/studios/reducer';

type Props = { movie: MovieExt; onClose: () => void };
const ModalContent: React.FC<Props> = ({ movie, onClose }) => {
  const dispatch = useAppDispatch();
  const { studios } = useAppSelector((state) => state.studios);
  const studiosAllowed = studios.filter(
    (studio) => studio.id !== movie.studioId && studio.money > movie.price,
  );
  const [buyerId, setBuyerId] = useState(studiosAllowed[0].id);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { movieId: movie.id, studioToId: buyerId };

    await postTransferMovie(body); // the interceptor handles any error
    dispatch(fetchMoviesRequest());
    dispatch(fetchStudiosRequest());

    onClose();
  };

  const onStudioChange = (e: SelectChangeEvent) => {
    const id = e.target.value;
    setBuyerId(id);
  };

  return (
    <Fragment>
      <h3>Transfer Movie</h3>
      <form onSubmit={onSubmit}>
        <Typography>Movie to transfer: {movie.name}</Typography>
        <Typography>Seller: {movie.studio}</Typography>
        <Typography>Price: ${movie.price}</Typography>
        <div className="buyer-container">
          <FormControl fullWidth>
            <InputLabel id="selBuyerLabel">Buyer Studio</InputLabel>
            <Select
              id="selBuyer"
              data-testid="selBuyer"
              labelId="selBuyerLabel"
              value={buyerId}
              label="Buyer Studio"
              onChange={onStudioChange}>
              {studiosAllowed.map((studio) => (
                <MenuItem key={studio.id} value={studio.id}>
                  {studio.name} - Money: ${studio.money}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="transfer-buttons">
          <Button color="secondary" variant="contained" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Transfer
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default ModalContent;
