import './App.css'
import React, {useState, useEffect} from 'react'
import {Avatar, Card, Grid, Typography} from '@material-ui/core'
import api from './api';
 
const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'
 
const App = () => {
  const [studios, setStudios] = useState([]);
  const [movies, setMovies] = useState([]);
  const [avatarSize, setAvatarSize] = useState(280);
  const [cardStyle, setCardStyle] = useState('regularCard');
 
  useEffect(() => {
    window.addEventListener('resize', responsiveStyle);
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    const studiosData = await api.getStudios();
    setStudios(studiosData);

    const moviesData = await api.getMovies();
    setMovies(moviesData);
  };
 
  const responsiveStyle = () => {
    //TODO: produce a better resize strategy
    if (window.innerWidth < 601) {
      setAvatarSize(60);
      setCardStyle('smallCard');
    } else {
      setAvatarSize(280);
      setCardStyle('regularCard');
    }
  };
 
  return (
    <div className="App">
      <div className="App-studios App-flex">{
          //TODO: 4 Filter the movies by genre, price and title
        }
        <h3>Images:</h3>
        <Grid container justify="center" alignItems="center">
          {movies.map(movie => (
            //TODO: 3 move styles into a separate js file and export this class using withStyles or similar or just to css file
            <Grid item xs={12} sm={6} lg={4} key={movie.name}>
              <Card className={cardStyle}>
                <Avatar alt={movie.name} src={movie.imgUrl ?? defaultAvatar}
                        style={{margin: 5, width: avatarSize, height: avatarSize}}
                        imgProps={{referrerPolicy:"no-referrer"}}/>
                <div>
                  <Typography style={{display: 'inline-block'}}>
                    {movie.name + ' '}
                    <Typography style={{fontWeight: 'bold', display: 'inline-block'}}>
                      {movie.position}
                    </Typography>
                  </Typography>
                </div>
                <Typography>{
                  // eslint-disable-next-line
                  studios.map(studio => {
                    if (movie.studioId === studio.id) {
                      return studio.name
                    }
                    return null;
                  })
                }</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}
 
export default App;