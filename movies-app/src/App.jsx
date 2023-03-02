import { useStyles } from './App.styles'
import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FilterSection from './FilterSection';
import api from './api';
 
const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'
 
const App = () => {
  const [studios, setStudios] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState(null);

  const styles = useStyles();

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if(filters){
      filterData(filters).catch(console.error);
    }
  }, [filters]);

  const filterData = async (filters) => {
    const filteredData = await api.getMovies(filters);

    setMovies(filteredData);
  };

  const fetchData = async () => {
    const studiosData = await api.getStudios();
    setStudios(studiosData);

    const moviesData = await api.getMovies();
    setMovies(moviesData);
  };
 
  return (
    <div className={styles.appContainer}>
      <div className={styles.appFlex}>
        <FilterSection setFilterValues={setFilters} />
        <h3>Images:</h3>
        <Grid container justify="center" alignItems="center">
          {movies.length ? movies.map(movie => (
            <Grid item xs={12} sm={6} lg={4} key={movie.name}>
              <Card className={styles.card}>
                <Avatar alt={movie.name} src={movie.imgUrl ?? defaultAvatar}
                        className={styles.avatar}
                        imgProps={{referrerPolicy:"no-referrer"}}/>
                <div>
                  <Typography className={styles.movieName}>
                    {movie.name + ' '}
                    <Typography className={styles.moviePosition}>
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
          )) :
          filters && <div>No results</div>}
        </Grid>
      </div>
    </div>
  )
}
 
export default App;