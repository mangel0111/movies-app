import './MovieItem.css';
import {Avatar, Card, Grid, makeStyles, Typography} from '@material-ui/core';

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

const MovieItem = ({ movie }) => {
  const styles = useStyles();

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
        <div>
          <Typography className="movieName">
            {movie.name + ' '}
            <span></span>
          </Typography>
        </div>
        <Typography>{movie.studio}</Typography>
      </Card>
    </Grid>
  );
}

export default MovieItem;
