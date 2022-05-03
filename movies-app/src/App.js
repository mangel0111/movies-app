import './App.css';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import { defaultAvatar } from './assets/images/DefaultAvatar';
import { FetchGet } from './services/FetchGet';
import useMount from './hooks/useMount';
import json2mq from 'json2mq';

function withPriceMap(items) {
  return items.map((item, index) => {
    return index % 2 ? Object.assign(item, { price: 5 }) : Object.assign(item, { price: 10 });
  });
}

const MOVIE_CATEGORY_ENUM = {
  TERROR: 6,
  ACTION: 9,
  SUPER_HEROES: 1,
  ANIMATED: 4
};

export function App() {
  const [moviesCacheState, moviesCacheSetState] = useState([]);
  const [moviesState, moviesSetState] = useState([]);
  const [studiosState, studioSetState] = useState([]);
  const [priceState, setPrice] = useState('');
  const [genreState, setGenre] = useState('');
  const [textInputState, setTextInput] = useState('');
  const mediaQuery = useMediaQuery(
    json2mq({
      minWidth: 601
    })
  );

  useEffect(() => {
    const fetchStudios = FetchGet('/studios');
    const fetchMovies = FetchGet('/movies');
    Promise.all([fetchStudios, fetchMovies]).then(([studios, movies]) => {
      const setPrice = withPriceMap(movies);
      moviesSetState(setPrice);
      moviesCacheSetState(setPrice);
      studioSetState(studios);
    });
  }, []);

  useMount(() => {
    const movies = moviesCacheState.filter((item) => filterLogic(item));
    moviesSetState(movies);
  }, [priceState, genreState, textInputState]);

  const filterLogic = (item) => {
    const scapeValue = textInputState.toLowerCase();
    const itemsValue = {
      price: returnValue(priceState),
      genre: returnValue(genreState),
      name: returnValue(scapeValue)
    };
    const acceptedItem = Object.fromEntries(
      Object.entries(itemsValue).filter(([, v]) => v != null)
    );

    let singleton = [];
    for (const [key, value] of Object.entries(acceptedItem)) {
      if (key === 'name') {
        const nameValue = item.name.trim().toLowerCase();
        if (!nameValue.includes(value)) continue;
      } else if (item[key] !== value) {
        continue;
      }
      singleton.push(item);
    }

    if (singleton.length === Object.entries(acceptedItem).length) {
      return item;
    }
    singleton = [];
  };

  const returnValue = (value) => {
    return value ? value : null;
  };

  const handleChangePrice = ({ target }) => {
    const { value } = target;
    setPrice(value);
  };

  const handleChangeGenre = ({ target }) => {
    const { value } = target;
    setGenre(value);
  };

  const handleChangeField = (event) => {
    if (!(event.key === 'Enter')) return;
    const { target } = event;
    const eventValue = target.value.trim();
    setTextInput(eventValue);
  };

  return (
    <div className="App">
      <div className="App-studios App-flex">
        <div className="menu-inputs__box">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Price</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select"
              inputProps={{ 'data-testid': 'select-price-testing' }}
              value={priceState}
              label="price"
              onChange={handleChangePrice}>
              <MenuItem value={5}>five</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Genre</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={genreState}
              label="Genre"
              inputProps={{ 'data-testid': 'select-genre-testing' }}
              onChange={handleChangeGenre}>
              <MenuItem value={MOVIE_CATEGORY_ENUM.SUPER_HEROES}>Heroes</MenuItem>
              <MenuItem value={MOVIE_CATEGORY_ENUM.ANIMATED}>Animated</MenuItem>
              <MenuItem value={MOVIE_CATEGORY_ENUM.TERROR}>Terror</MenuItem>
              <MenuItem value={MOVIE_CATEGORY_ENUM.ACTION}>Action</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="text"
            onKeyUp={handleChangeField}
            inputProps={{ 'data-testid': 'text-field-testing' }}
            id="standard-basic"
            label="Title"
            variant="standard"
          />
        </div>
        <h3>Images:</h3>
        <Grid container justifyContent="center" alignItems="center">
          {moviesState.map((movie, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4}>
              <Card className={mediaQuery ? 'regularCard' : 'smallCard'}>
                <Avatar
                  alt={movie.name}
                  style={{ width: mediaQuery ? 280 : 60, height: mediaQuery ? 280 : 60 }}
                  src={movie.img ? movie.img : defaultAvatar}
                />
                <div>
                  <Typography className="display-inline__style" component={'span'}>
                    {movie.name + ' '}
                    <Typography className="display-inline__style font-bold" component={'span'}>
                      {movie.position}
                    </Typography>
                  </Typography>
                </div>
                <Typography component={'span'}>
                  {studiosState.map((studio) => {
                    if (movie.studioId === studio.id) {
                      return studio.name;
                    }
                  })}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default App;
