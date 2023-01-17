import './MovieItem.css';
import {Avatar, Card, Grid, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import TransferModalButton from './TransferModalButton/TransferModalButton';

const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg';

// using this here to avoid using !important in css file (MaterialUI overwrites styles without that)
const useStyles = makeStyles({
  avatar: {
    margin: 5,
    height: 60,
    width: 60,
    '@media (min-width: 600px)': {
      height: 280,
      width: 280,
    }
  }
});

// Note from DavidRamos: I'm assuming price higher than 100000 is out of market

const MovieItem = ({ movie }) => {
  const { studios } = useSelector((state) => state.studios);
  const styles = useStyles();

  const canBeBought = studios.some(studio => studio.money >= movie.price);

  return (
    <Grid data-testid="griditem" item xs={12} sm={6} lg={4}>
      <Card className="movieCard">
        <Avatar
          alt={movie.name}
          className={styles.avatar}
          src={movie.img}
          imgProps={{ referrerPolicy: "no-referrer"}}>
            <img className="notFoundImage" alt="Not found" src={defaultAvatar} />
        </Avatar>
        <div className="movieName">
          <Typography>
            {movie.name + ' '}
            <span>{movie.price > 100000 ? '' : `$${movie.price}`}</span>
          </Typography>
        </div>
        <Typography>{movie.studio}</Typography>
        <div className="modal-button-container">
          {canBeBought && <TransferModalButton movie={movie} />}
        </div>
      </Card>
    </Grid>
  );
}

export default MovieItem;
