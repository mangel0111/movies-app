import config from '../constants/config'
import { Avatar, Card, Grid, Grow, Typography } from '@material-ui/core'
import useAvatarSize from '../hooks/useAvatarSize'

const MoviesList = ({ movies, studios }) => {
  const { cardStyle, avatarSize } = useAvatarSize()
  return (
    <Grow in>
      <Grid container justify="center" alignItems="center">
        {movies.map((movie) => (
          //TODO: 3 move styles into a separate js file and export this class using withStyles or similar or just to css file
          <Grid item xs={12} sm={6} lg={4}>
            <Card className={cardStyle}>
              <Avatar
                alt={movie.name}
                src={movie.img ? movie.img : config.DEFAULT_AVATAR}
                style={{ margin: 5, width: avatarSize, height: avatarSize }}
              />
              <div>
                <Typography style={{ display: 'inline-block' }}>
                  {movie.name + ' '}
                  <Typography
                    style={{ fontWeight: 'bold', display: 'inline-block' }}
                  >
                    {movie.position}
                  </Typography>
                </Typography>
              </div>
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
