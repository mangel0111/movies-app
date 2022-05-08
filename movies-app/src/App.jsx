import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Card, CardActions, Grid, Typography } from "@material-ui/core";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import "./App.css";
import { SellModal } from "./components/SellModal";

import { defaultAvatar, fetchAPI } from "./api/api";
import { filterMovies } from "./utils";

const App = () => {
  const [studios, setStudios] = useState([]);
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectValue, setSelectValue] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = useState(false);

  const genreRef = useRef(null);
  const titleRef = useRef(null);
  const priceRef = useRef(null);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const getGenres = useCallback(async () => {
    const genres = await fetchAPI("genres");
    console.log("genres", genres);
    setGenres(genres);
  }, []);

  const getStudios = useCallback(async () => {
    const studios = await fetchAPI("studios");
    console.log("studios", studios);
    setStudios(studios);
  }, []);

  const getMovies = useCallback(async () => {
    const movies = await fetchAPI("movies");
    console.log("movies", movies);
    setMovies(movies);
    setAllMovies(movies);
  }, []);

  useEffect(() => {
    try {
      getStudios();
      getMovies();
      getGenres();
    } catch (err) {
      console.log(err);
    }
  }, [getStudios, getMovies, getGenres]);

  const searchMovies = useCallback(async (filter) => {
    const movies = await fetchAPI("movies/search", "POST", filter);
    setMovies(movies);
  }, []);

  const handleSearch = () => {
    searchMovies({
      genre: genreRef.current.value,
      title: titleRef.current.value,
      price: priceRef.current.value,
    });
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
    setMovies(
      filterMovies(allMovies, {
        genre: e.target.value,
        title: titleRef.current.value,
        price: priceRef.current.value,
      })
    );
  };

  const handleTextChange = () => {
    setMovies(
      filterMovies(allMovies, {
        genre: selectValue,
        title: titleRef.current.value,
        price: priceRef.current.value,
      })
    );
  };

  const handleSell = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const confirmSell = async (studioId) => {
    const movieId = selectedMovie.id;
    try {
      const { movies: newMovies } = await fetchAPI("transfer", "POST", {
        movieId,
        studioId,
      });
      setOpen(false);
      setMovies(newMovies);
      setAllMovies(newMovies);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className="App-studios App-flex">
        <div className="App-movies-filter">
          <Stack direction="row" spacing={2}>
            <TextField
              id="genre-input"
              label="Genre"
              select
              variant="outlined"
              inputRef={genreRef}
              onChange={(e) => handleSelectChange(e)}
              value={selectValue}
            >
              <MenuItem key={"all"} value={"all"}>
                All
              </MenuItem>
              {Object.keys(genres).map((genre) => (
                <MenuItem key={genre} value={genres[genre]}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="title-input"
              label="Title"
              variant="outlined"
              inputRef={titleRef}
              onKeyUp={handleTextChange}
            />
            <TextField
              id="price-input"
              label="Price"
              variant="outlined"
              inputRef={priceRef}
              onKeyUp={handleTextChange}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Stack>
        </div>
        <Grid container justify="center" alignItems="center">
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} lg={4} key={movie.id}>
              <Card className={sm ? "smallCard" : "regularCard"}>
                <div className={sm ? "smallAvatar" : "regularAvatar"}>
                  <Avatar
                    alt={movie.name}
                    src={movie.img ? movie.img : defaultAvatar}
                  />
                </div>
                <div>
                  <Typography className="inline">{movie.name + " "}</Typography>
                </div>
                {studios.map(
                  (studio) =>
                    movie.studioId === studio.id && (
                      <Typography
                        key={`${movie.id}-${movie.studioId}`}
                        className="inline bold"
                      >
                        {studio.name}
                      </Typography>
                    )
                )}
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => handleSell(movie)}
                  >
                    Sell
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {selectedMovie && studios && (
          <SellModal
            open={open}
            closeModal={() => setOpen(false)}
            confirm={confirmSell}
            movie={selectedMovie}
            studios={studios}
          />
        )}
      </div>
    </div>
  );
};

export default App;
