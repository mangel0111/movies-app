import { useState, Fragment } from 'react';
import { Typography, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postTransferMovie } from '../../../store/movies/services';
import { fetchMoviesRequest } from '../../../store/movies/reducer';
import { fetchStudiosRequest } from '../../../store/studios/reducer';

const ModalContent = ({ movie, onClose }) => {
  const dispatch = useDispatch();
  const { studios } = useSelector((state) => state.studios);
  const studiosAllowed = studios.filter(studio =>
    studio.id !== movie.studioId && studio.money > movie.price
  );
  const [buyerId, setBuyerId] = useState(studiosAllowed[0].id);

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = { movieId: movie.id, studioToId: buyerId };

    await postTransferMovie(body); // the interceptor handles any error
    dispatch(fetchMoviesRequest());
    dispatch(fetchStudiosRequest());

    onClose();
  };

  const onStudioChange = (e) => {
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
              onChange={onStudioChange}
            >
              {studiosAllowed.map(studio => (
                <MenuItem key={studio.id} value={studio.id}>
                  {studio.name} - Money: ${studio.money}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="transfer-buttons">
          <Button color="secondary" variant="contained" onClick={onClose}>Close</Button>
          <Button color="primary" variant="contained" type="submit">Transfer</Button>
        </div>
      </form>
    </Fragment>
  );
};

export default ModalContent;
