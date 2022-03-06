import './App.css'
import React from 'react'
import { Card, Grid, Typography, styled } from '@material-ui/core'
import DefaultImage from './components/DefaultImage'
import Avatar from './components/Avatar'
import Container from './components/Container'
import StudioContainer from './components/StudioContainer'
import Filters from './components/Filters'
import * as Api from './api'
// TODO: Review image loading from wikia.com
const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

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
  const [avatarSize, setAvatarSize] = React.useState(280)
  const [cardStyle, setCardStyle] = React.useState('regularCard')

  const responsiveStyle = () => {
    //TODO: produce a better resize strategy
    if (window.innerWidth < 601) {
      console.log(window.innerWidth)
      setAvatarSize(60)
      setCardStyle('smallCard')
    } else {
      setAvatarSize(280)
      setCardStyle('regularCard')
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', responsiveStyle())

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
  return (
    <Container>
      <StudioContainer> 
        <h3>Images:</h3>
        <Filters {...{ genresList, handleFilterChange, filters }} />
        <Grid container justify="center" alignItems="center">
          {movies.map(movie =>
            <Grid item xs={12} sm={6} lg={4}>
              <Card className={cardStyle}>
                <Avatar width={avatarSize} height={avatarSize} alt={movie.name} src={movie.img || defaultAvatar} />
                <DefaultImage movie={movie} />
                <Typography>{
                  // eslint-disable-next-line
                  studios.map(studio => {
                    if (movie.studioId === studio.id) {
                      return studio.name
                    }
                  })}</Typography>
              </Card>
            </Grid>)}
        </Grid>
      </StudioContainer>
    </Container>
  )

}

export default App
