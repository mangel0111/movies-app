import './App.css'
import React, { useState, useEffect } from 'react'
import { Avatar, Card, Grid, Typography } from '@material-ui/core'

//TODO: 2 Move these calls into a proper api layer
const domain = 'http://localhost:4000'
const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

function App() {
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState([]);
  const [cardStyle, setCardStyle] = useState({
    size: 280,
    className: "regularCard"
  })

  useEffect(() => {
    window.addEventListener('resize', responsiveStyle)
    fetch(`${domain}/studios`)
      .then(response => response.json())
      .then(studios => { setStudios(studios) });

    fetch(`${domain}/movies`)
      .then(response => response.json())
      .then(movies => { setMovies(movies) });
  }, [])


  function responsiveStyle() {
    //TODO: produce a better resize strategy
    if (window.innerWidth < 601) {
      console.log(window.innerWidth)
      setCardStyle({ size: 60, className: 'smallCard' })
    } else {
      setCardStyle({ size: 280, className: 'regularCard' })
    }
  }

  return (
    <div className="App">
      <div className="App-studios App-flex"> {
        //TODO: 4 Filter the movies by genre, price and title
      }
        <h3>Images:</h3>
        <Grid container justify="center" alignItems="center">
          {movies.map(movie =>
            //TODO: 3 move styles into a separate js file and export this class using withStyles or similar or just to css file
            <Grid key={movie.name} item xs={12} sm={6} lg={4}>
              <Card className={cardStyle.className}>
                <Avatar alt={movie.name} src={movie.img ? movie.img : defaultAvatar}
                  style={{ margin: 5, width: cardStyle.size, height: cardStyle.size }} />
                <div>
                  <Typography style={{ display: 'inline-block' }}>
                    {movie.name + ' '}
                  </Typography>
                </div>
                <Typography>{
                  // TODO: Turn studios into dictionary, id: name
                  studios.map(studio => movie.studioId === studio.id ? studio.name : null)
                }</Typography>
              </Card>
            </Grid>)}
        </Grid>
      </div>
    </div>
  );
}

export default App
