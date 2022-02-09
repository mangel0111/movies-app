import { Box, Card, Grid, Grow, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useAvatarSize from '../hooks/useAvatarSize'
import Thumbnail from './Thumbnail'

const useStyles = makeStyles({
  card: {
    border: '1px solid gray',
    borderRadius: '4px',
    margin: '2px',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: (props) =>
      props.cardStyle === 'regularCard' ? 'column' : 'row',
    justifyContent: (props) =>
      props.cardStyle === 'regularCard' ? 'center' : 'left',
  },
  titleContainer: {
    display: 'flex',
    rowGap: 4,
  },
  text: {
    fontWeight: 'bold',
    display: 'inline-block',
  },
})

const MoviesList = ({ movies, studios }) => {
  const { cardStyle, avatarSize } = useAvatarSize()
  const classes = useStyles({ cardStyle })

  return (
    <Grow in>
      <Grid container justify="center" alignItems="center">
        {movies.map((movie) => (
          <Grid key={movie.name} item xs={12} sm={6} lg={4}>
            <Card className={classes.card}>
              <Thumbnail img={movie.img} size={avatarSize} />
              <Box className={classes.titleContainer}>
                <Typography className={classes.text}>{movie.name}</Typography>
                <Typography className={classes.text}>
                  {movie.position}
                </Typography>
              </Box>
              <Typography>
                {studios.map((studio) => {
                  if (movie.studioId === studio.id) {
                    return studio.name
                  } else {
                    return null
                  }
                })}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grow>
  )
}

export default MoviesList
