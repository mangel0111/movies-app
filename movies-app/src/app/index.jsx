import React from "react";
import { useQuery } from "react-query";
import { Avatar, Card, Grid, Typography } from "@material-ui/core";

import useIsMobile from "../hooks/useMobile";
import { getMovies } from "../services/movies/service";

import { CARD_SIZE_CONFIG, DEFAULT_AVATAR } from "./constants";
import "./index.css";

function App() {
  const isMobile = useIsMobile();

  const { data: movies, isFetching: moviesLoading } = useQuery("movies", () =>
    getMovies()
  );

  const size = isMobile
    ? CARD_SIZE_CONFIG.SMALL.size
    : CARD_SIZE_CONFIG.REGULAR.size;

  const cardStyle = isMobile
    ? CARD_SIZE_CONFIG.SMALL.style
    : CARD_SIZE_CONFIG.REGULAR.style;

  return (
    <div className="App">
      <div className="App-studios App-flex">
        {
          //TODO: 4 Filter the movies by genre, price and title
        }
        <h3>Images</h3>
        <Grid container justify="center" alignItems="center">
          {!moviesLoading &&
            movies.map((movie) => (
              //TODO: 3 move styles into a separate js file and export this class using withStyles or similar or just to css file
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
                  <Typography
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {movie.name}
                    <Typography
                      style={{ fontWeight: "bold", display: "inline-block" }}
                    >
                      {movie.genre}
                    </Typography>
                  </Typography>
                  <Typography>{movie.studioName}</Typography>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default App;
