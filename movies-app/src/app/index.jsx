import React, { useState } from "react";
import { useQuery } from "react-query";
import { Avatar, Card, Grid, Typography, TextField } from "@material-ui/core";

import useIsMobile from "../hooks/useMobile";
import { getMovies } from "../services/movies/service";

import { CARD_SIZE_CONFIG, DEFAULT_AVATAR, ENTER_KEY_CODE } from "./constants";
import { getFilteredMovies } from "./utils";
import "./index.css";

function App() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState("");

  const { data: movies, isFetching: moviesLoading } = useQuery("movies", () =>
    getMovies()
  );

  const onHandleSearch = (inputValue) => setFilter(inputValue.toLowerCase());
  const onHandleKeyDown = (e) =>
    e.key === ENTER_KEY_CODE && movies && onHandleSearch(e.target.value);

  const size = isMobile
    ? CARD_SIZE_CONFIG.SMALL.size
    : CARD_SIZE_CONFIG.REGULAR.size;

  const cardStyle = isMobile
    ? CARD_SIZE_CONFIG.SMALL.style
    : CARD_SIZE_CONFIG.REGULAR.style;

  console.log(movies);
  const filteredMovies = getFilteredMovies(filter, movies);

  return (
    <div className="App">
      <div className="App-studios App-flex">
        <h1>Images</h1>
        <TextField
          className="movies-search-input"
          inputProps={{ "data-testid": "movies-app-search-input" }}
          onKeyDown={onHandleKeyDown}
          placeholder="Find by genre, price and title"
        />
        <Grid container justify="center" alignItems="center">
          {!moviesLoading &&
            filteredMovies.map((movie) => (
              <Grid key={movie.id} item xs={12} sm={6} lg={4}>
                <Card className={cardStyle}>
                  <Avatar
                    alt={movie.name}
                    src={movie.img}
                    style={{ margin: 5, width: size, height: size }}
                  >
                    <Avatar
                      style={{
                        margin: 5,
                        width: size,
                        height: size,
                      }}
                      src={DEFAULT_AVATAR}
                    />
                  </Avatar>
                  <Typography className="movie-info">
                    {movie.name} - ${movie.price}
                    <Typography className="genre-font">
                      {movie.genre}
                    </Typography>
                    <Typography>{movie.studioName}</Typography>
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
