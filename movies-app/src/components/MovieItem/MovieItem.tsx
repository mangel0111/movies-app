import './MovieItem.css';

import { Avatar, Card, Grid, Typography } from '@mui/material';
import tw from 'twin.macro';

import { MovieExt } from '../../store/movies/reducer';
import TransferModalButton from './TransferModalButton';

const defaultAvatar =
  'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg';

const StyledAvatar = tw(Avatar)`m-[5px] h-[60px] w-[60px] sm:h-[280px] sm:w-[280px]`;

type Props = { movie: MovieExt };
const MovieItem: React.FC<Props> = ({ movie }) => (
  <Grid data-testid="griditem" item xs={12} sm={6} lg={4}>
    <Card className="movieCard">
      <StyledAvatar alt={movie.name} src={movie.img} imgProps={{ referrerPolicy: 'no-referrer' }}>
        <img className="notFoundImage" alt="Not found" src={defaultAvatar} />
      </StyledAvatar>
      <div className="movieName">
        <Typography>
          {movie.name + ' '}
          <span>{movie.price > 100000 ? '' : `$${movie.price}`}</span>
        </Typography>
      </div>
      <Typography>{movie.studio}</Typography>
      <div className="modal-button-container">
        <TransferModalButton movie={movie} />
      </div>
    </Card>
  </Grid>
);

export default MovieItem;
