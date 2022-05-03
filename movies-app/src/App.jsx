import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Card, Grid, Typography } from "@material-ui/core";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import "./App.css";

import { defaultAvatar, fetchAPI } from "./api/api";
import { filterMovies } from "./utils";

const App = () => {
  const [studios, setStudios] = useState([]);
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectValue, setSelectValue] = useState("all");

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

  const searchMovies = useCallback(async (filter) => {
    const movies = await fetchAPI("movies/search", "POST", filter);
    setMovies(movies);
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

  return (
    <div className="App">
      <div className="App-studios App-flex">
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
        <h3>Images:</h3>
        <Grid container justify="center" alignItems="center">
          {movies.map((movie) => (
            //TODO: 3 move styles into a separate js file and export this class using withStyles or similar or just to css file
            <Grid item xs={12} sm={6} lg={4} key={movie.id}>
              <Card className={sm ? "smallCard" : "regularCard"}>
                <Avatar
                  alt={movie.name}
                  src={movie.img ? movie.img : defaultAvatar}
                  style={{
                    margin: 5,
                    width: sm ? 60 : 280,
                    height: sm ? 60 : 280,
                  }}
                />
                <div>
                  <Typography style={{ display: "inline-block" }}>
                    {movie.name + " "}
                  </Typography>
                  <Typography
                    style={{ fontWeight: "bold", display: "inline-block" }}
                  >
                    {movie.position}
                  </Typography>
                </div>
                {studios.map(
                  (studio) =>
                    movie.studioId === studio.id && (
                      <Typography key={`${movie.id}-${movie.studioId}`}>
                        {studio.name}
                      </Typography>
                    )
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default App;
