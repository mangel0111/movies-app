import { useStyles } from './App.styles'
import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FilterSection from './FilterSection';
import TransferModal from './TransferModal';
import Button from '@material-ui/core/Button';
import api from './api';
 
const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'
 
const App = () => {
  const [studios, setStudios] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState(null);
  const [transferData, setTransferData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({studios:[]});

  const styles = useStyles();

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if(filters){
      filterData(filters).catch(console.error);
    }
  }, [filters]);

  useEffect(() => {
    if(transferData){
      postMovie(transferData).catch(console.error);
    }
  }, [transferData]);

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

  const postMovie = async (transferData) => {
      const response = await api.transferMovie(transferData);
      setMovies(response);
  }

  const openModal = (studioId, movieId) => {
    setModalProps({studios: studios.filter(studio => studio.id !== studioId), movieId})
    setShowModal(true);
  };

  const confirmTransfer = (studioId, movieId) => {
    setFilters(null);
    setTransferData({studioId, movieId})
  }

  return (
    <div className={styles.appContainer}>
      <TransferModal open={showModal} confirmTransfer={confirmTransfer} onClose={() => setShowModal(false)} {...modalProps}/>
      <div className={styles.appFlex}>
        <FilterSection setFilterValues={setFilters} filterValues={filters} />
        <h3>Images:</h3>
        <Grid container justify="center" alignItems="center">
          {movies.length ? movies.map(movie => {
            const studio = studios.find(studio => (
              movie.studioId === studio.id
            ))
            return (
              <Grid item xs={12} sm={6} lg={4} key={movie.name}>
                <Card className={styles.card}>
                  <Avatar alt={movie.name} src={movie.imgUrl ?? defaultAvatar}
                          className={styles.avatar}
                          imgProps={{referrerPolicy:"no-referrer"}}/>
                  <div>
                    <Typography className={styles.movieName}>
                      {movie.name + ' '}
                      <span className={styles.moviePosition}>
                        {movie.position}
                      </span>
                    </Typography>
                  </div>
                  <Typography>{
                    // eslint-disable-next-line
                    studio?.name
                  }</Typography>
                  <Button onClick={() => openModal(studio.id, movie.id)}>Transfer</Button>
                </Card>
              </Grid>
            )
          }) :
          filters && <div>No results</div>}
        </Grid>
      </div>
    </div>
  )
}
 
export default App;