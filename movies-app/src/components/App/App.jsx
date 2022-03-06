import './App.css'
import React from 'react'
import { Grid } from '@material-ui/core'
import Container from '../Container/Container'
import StudioContainer from '../StudioContainer/StudioContainer'
import Filters from '../Filters/Filters'
import * as Api from '../../api'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '../Card/Card'

const App = () => {
  const [studios, setStudios] = React.useState([])
  const [movies, setMovies] = React.useState([])
  const [genresList, setGenresList] = React.useState([])
  const [filters, setFilters] = React.useState({
    genreId: undefined,
    minPrice: 0,
    maxPrice: undefined,
    title: undefined
  })

  const isSmallCard = useMediaQuery('(max-width:600px)')

  React.useEffect(() => {
    Api.getStudios()
      .then(studios => {
        setStudios(studios)
      });
    Api.getGenres()
      .then(genres => {
        setGenresList(genres)
      });
  }, [])

  React.useEffect(() => {
    Api.getMovies(filters)
      .then(movies => {
        setMovies(movies)
      });
  }, [filters])

  const handleFilterChange = (id) => {
    return (e) => {
      if (['minPrice', 'maxPrice'].includes(id)) {
        if ((/^\d*$/).test(e.target.value)) {
          setFilters(prev => ({ ...prev, [id]: e.target.value }))
        }
      } else {
        setFilters(prev => ({ ...prev, [id]: e.target.value }))
      }
    }
  }

  const handleOnSellMovie = async (movieId, movieStudioId, nextStudioId) => {
    await Api.transferMovie({ movieId, movieStudioId, nextStudioId })
      .then(({movies,studios}) => {
        setMovies(movies)
        setStudios(studios)
      })
  }
  console.log("Studios", studios)
  return (
    <Container>
      <StudioContainer>
        <h3 id="title">Images:</h3>
        <Filters {...{ genresList, handleFilterChange, filters }} />
        <Grid container justify="center" alignItems="center">
          {movies.map(movie =>
            <Grid item xs={12} sm={6} lg={4}>
              <Card {...{ isSmallCard, movie, studios}} onSellMovie={handleOnSellMovie} />
            </Grid>)}
        </Grid>
      </StudioContainer>
    </Container>
  )

}

export default App
