import React, { useState } from "react";
import { useQuery } from "react-query";
import { Avatar, Card, Grid, Typography, TextField } from "@material-ui/core";

import LoadingWrapper from "../../../components/LoadingWrapper";
import { getMovies } from "../../../services/movies/service";
import useIsMobile from "../../../hooks/useMobile";

import { CARD_SIZE_CONFIG, DEFAULT_AVATAR, ENTER_KEY_CODE } from "./constants";
import { getFilteredMovies } from "./utils";

import styles from "./styles.module.scss";

function Home() {
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

  const filteredMovies = getFilteredMovies(filter, movies);

  const avatarStyle = {
    margin: 5,
    width: size,
    height: size,
  };

  return (
    <LoadingWrapper loading={moviesLoading}>
      <div className={styles.homeContainer}>
        <div className={styles.homeBody}>
          <h1>Images</h1>
          <TextField
            className={styles.moviesSearchInput}
            inputProps={{ "data-testid": "movies-app-search-input" }}
            onKeyDown={onHandleKeyDown}
            placeholder="Find by genre, price and title"
          />
          <Grid
            data-testid="movies-app-grid-container"
            container
            className={styles.gridContainer}
          >
            {!moviesLoading &&
              filteredMovies &&
              filteredMovies.length > 0 &&
              filteredMovies.map((movie) => (
                <Grid key={movie.id} item xs={12} sm={6} lg={4}>
                  <Card className={cardStyle}>
                    <Avatar alt={movie.img} src={movie.img} style={avatarStyle}>
                      <Avatar style={avatarStyle} src={DEFAULT_AVATAR} />
                    </Avatar>
                    <div className={styles.movieInfo}>
                      <Typography className={styles.movieInfo}>
                        {movie.name} - ${movie.price}
                      </Typography>
                      <Typography className={styles.genreFont}>
                        {movie.genre}
                      </Typography>
                      <Typography>{movie.studioName}</Typography>
                    </div>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </LoadingWrapper>
  );
}

export default Home;
