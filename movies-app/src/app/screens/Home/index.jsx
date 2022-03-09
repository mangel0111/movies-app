import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Card,
  Grid,
  Typography,
  TextField,
  NativeSelect,
} from "@material-ui/core";

import LoadingWrapper from "../../../components/LoadingWrapper";
import * as moviesActions from "../../../redux/Movie/actions";
import * as studiosActions from "../../../redux/Studio/actions";
import useIsMobile from "../../../hooks/useMobile";

import { CARD_SIZE_CONFIG, DEFAULT_AVATAR, ENTER_KEY_CODE } from "./constants";
import { getFilteredMovies } from "./utils";

import styles from "./styles.module.scss";

function Home() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  const {
    movies: { movies, moviesLoading },
    studios: { studios, studiosLoading },
  } = useSelector((state) => state);

  useEffect(() => {
    if (!movies) {
      dispatch(moviesActions.getMovies());
    }

    if (!studios) {
      dispatch(studiosActions.getStudios());
    }
  });

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
    <LoadingWrapper loading={(moviesLoading, studiosLoading)}>
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
            {filteredMovies &&
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
                      <NativeSelect
                        defaultValue={movie.studioName}
                        inputProps={{
                          name: "studio",
                          id: "uncontrolled-native",
                        }}
                        onChange={(e) =>
                          console.log(
                            `Change studio for movie ${movie.name} from ${movie.studioName} to ${e.target.value}`
                          )
                        }
                      >
                        {studios &&
                          studios.map((studio) => (
                            <option
                              className={styles.option}
                              value={studio.name}
                            >
                              {studio.name}
                            </option>
                          ))}
                      </NativeSelect>
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
