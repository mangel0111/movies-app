import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import { useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  spacer: {
    paddingTop: 32,
  },
})

const MovieTransfer = ({ movies, studios }) => {
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
              <Select onChange={(e) => handleChange('movie', e.target.value)}>
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
              <Select onChange={(e) => handleChange('studio', e.target.value)}>
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
              disabled={isSameStudio || !movieIdSelected || !studioIdSelected}
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
