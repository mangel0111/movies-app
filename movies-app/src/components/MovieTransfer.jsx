import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { DataContext } from '../contexts/Data'

const useStyles = makeStyles({
  spacer: {
    paddingTop: 32,
  },
})

const MovieTransfer = () => {
  const {
    movieSelected,
    studioSelected,
    movies,
    studios,
    isSameStudio,
    handleElementSelect,
    handleTransferOwnership,
  } = useContext(DataContext)
  const classes = useStyles()

  return (
    <Grow in>
      <Grid container className={classes.spacer}>
        <Grid item xs={12}>
          <Typography>Which movie do you want to transfer?</Typography>
        </Grid>
        <Grid container>
          <Grid item md={6} xs={12}>
            <FormControl style={{ width: '50%' }}>
              <InputLabel>Movie</InputLabel>
              <Select
                value={movieSelected?.id || ''}
                onChange={(e) => handleElementSelect('movie', e.target.value)}
              >
                {movies.map((movie) => (
                  <MenuItem key={movie.id} value={movie.id}>
                    {movie.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl style={{ width: '50%' }}>
              <InputLabel>Studio</InputLabel>
              <Select
                value={studioSelected?.id || ''}
                onChange={(e) => handleElementSelect('studio', e.target.value)}
              >
                {studios.map((studio) => (
                  <MenuItem key={studio.id} value={studio.id}>
                    {studio.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.spacer}>
          <Grid item xs={12}>
            <Button
              onClick={() => {
                console.log('CLICKED')
                handleTransferOwnership(movieSelected, studioSelected)
              }}
              disabled={isSameStudio || !movieSelected || !studioSelected}
              variant="contained"
            >
              Transfer ownership
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography color="error">
              {isSameStudio &&
                `${movieSelected.name} is already owned by ${studioSelected.name}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grow>
  )
}

export default MovieTransfer
