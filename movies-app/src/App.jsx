import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Card, Grid, Typography } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { defaultAvatar, fetchMovies, fetchStudios } from "./api/api";

const App = () => {
  const [studios, setStudios] = useState([]);
  const [movies, setMovies] = useState([]);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const getStudios = useCallback(async () => {
    const studios = await fetchStudios();
    setStudios(studios);
  }, []);

  const getMovies = useCallback(async () => {
    const movies = await fetchMovies();
    setMovies(movies);
  }, []);

  useEffect(() => {
    try {
      getStudios();
      getMovies();
    } catch (err) {
      console.log(err);
    }
  }, [getStudios, getMovies]);

  return (
    <div className="App">
      <div className="App-studios App-flex">
        {" "}
        {
          //TODO: 4 Filter the movies by genre, price and title
        }
        <h3>Images:</h3>
        <Grid container justify="center" alignItems="center">
          {movies.map((movie) => (
            //TODO: 3 move styles into a separate js file and export this class using withStyles or similar or just to css file
            <Grid item xs={12} sm={6} lg={4}>
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
                    <Typography
                      style={{ fontWeight: "bold", display: "inline-block" }}
                    >
                      {movie.position}
                    </Typography>
                  </Typography>
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
        </Grid>
      </div>
    </div>
  );
};

export default App;
