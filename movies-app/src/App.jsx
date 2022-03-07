import './App.scss';
import React, { useCallback, useEffect, useState } from 'react';
import {Avatar, Card, Grid, MenuItem, Select, TextField, Typography, Button} from '@material-ui/core';

import {movieServices} from "./Services/movieServices";
import {useWindowWidth} from "./Hooks/useWindowWidth";


const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg';

const App = () => {
  const [studios, setStudios] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const [selectedStudio, selectStudio] = useState("-1");
  const [selectedGenre, selectGenre] = useState("-1");
  const [searchText, setSearch] = useState("");

  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [transfer, setTransfer] = useState(0);

  const [avatarSize, setAvatarSize] = useState(280);
  const [cardStyle, setCardStyle] = useState("card--regular");
  const width = useWindowWidth();

  console.clear();

  const fetchMovies = useCallback(() => {
    const moviesPromise = movieServices.fetchMovies();
    const studiosPromise = movieServices.fetchStudios();
    const genresPromise = movieServices.fetchGenres();

    Promise.all([moviesPromise, studiosPromise, genresPromise]).then((responses) => {
      const movies = responses[0];
      setMovies(movies);

      const studios = responses[1];
      setStudios(studios);

      const genres = responses[2];
      setGenres(genres);
    });
  }, [])

  useEffect(() => {
    fetchMovies()
  }, []);

  useEffect(() => {
    if (width < 601) {
      setAvatarSize(60);
      setCardStyle("card--small");
    } else {
      setAvatarSize(280);
      setCardStyle("card--regular");
    }
  }, [width]);

  const search = (movies) => {
    return movies.filter((movie) => {
      let isValid = true;

      if (selectedGenre !== "-1") isValid = movie.genre == selectedGenre;

      if (selectedStudio !== "-1") isValid &= movie.studioId == selectedStudio;

      if (searchText !== "-1") isValid &= movie.name.includes(searchText);

      return isValid;
    });
  };

  const moviesByStudio = movies => {
    return from ? movies.filter(movie => movie.studioId == from) : movies;
  }

  const studiosWithoutOrigin = studios => {
    return studios.filter(({ id }) => id !== from)
  }

  const transferStudio = async() => {
    if(!from && !to && !transfer)
      throw new Error("Transfer not permitted")

    await movieServices.transferMovie(from, to, transfer)
    fetchMovies()
    setTransfer(0)
  }

  return (
    <div className="App">
      <div className="App-studios App-flex">
        <Grid container justifyContent="space-evenly">
          <Select value={selectedStudio} onChange={(e) => selectStudio(e.target.value)} id="select-studio">
            <MenuItem key="-1" value="-1">
              Select a studio
            </MenuItem>
            {studios.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            placeholder="Title"
            label="Title"
            variant="standard"
            value={searchText}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select value={selectedGenre} onChange={(e) => selectGenre(e.target.value)}>
            <MenuItem key="-1" value="-1">
              Select a genre
            </MenuItem>
            {genres.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <h3>Images:</h3>
        <Grid container justifyContent="center" alignItems="center">
          {search(movies).map((movie) => (
            <Grid key={`${movie.name}`} item xs={12} sm={6} lg={4}>
              <Card className={`card ${cardStyle}`}>
                <Avatar
                  alt={movie.name}
                  src={movie.img ? movie.img : defaultAvatar}
                  style={{
                    margin: 5,
                    width: avatarSize,
                    height: avatarSize,
                  }}
                  imgProps={{ referrerPolicy: "no-referrer" }}
                />
                <div>
                  <Typography className="text--bold">{movie.name}</Typography>
                </div>
                <Typography>
                  {
                    // eslint-disable-next-line
                    studios.map((studio) => {
                      if (movie.studioId === studio.id) {
                        return studio.name;
                      }
                    })
                  }
                </Typography>
              </Card>
            </Grid>
          ))}
          <Grid item lg={8}>
            <form>
              <div item>
                <label id="from-label">From: </label>
                <Select value={from} onChange={(e) => setFrom(e.target.value)} id="select-from" labelId="from-label">
                  <MenuItem value={0}>Pick a origin</MenuItem>
                  {studios.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div item>
                <label id="to-label">To: </label>
                <Select value={to} onChange={(e) => setTo(e.target.value)} id="select-to" labelId="to-label">
                  <MenuItem value={0}>Pick a destiny</MenuItem>
                  {studiosWithoutOrigin(studios).map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div item>
                <label id="transfer-movie">Movie: </label>
                <Select value={transfer} onChange={(e) => setTransfer(e.target.value)} labelId="transfer-movie">
                  <MenuItem value={0}>pick a movie</MenuItem>
                  {moviesByStudio(movies).map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <Button item variant="contained" onClick={transferStudio}>
                Transfer
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default App;
