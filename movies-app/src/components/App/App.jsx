import "./App.css";
import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { getMovies, getStudios } from "../../api/movies";
import MovieCard from "../MovieCard";
import MovieFilters from "../MovieFilters";
import useMovieFilters from "../../hooks/useMovieFilters";

function App() {
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState({});
  const { filters, onChangeFilter, displayMovies } = useMovieFilters(movies);

  useEffect(() => {
    getStudios().then((response) => {
      const studiosMap = {};
      response.forEach((studio) => {
        studiosMap[studio.id] = studio.name;
      });
      setStudios(studiosMap);
    });
    getMovies().then((response) => setMovies(response));
  }, []);

  return (
    <div className="App">
      <div className="App-studios App-flex">
        <Typography variant={"h3"}>Images:</Typography>
        <MovieFilters filters={filters} onChangeFilter={onChangeFilter} />
        <Grid container justify="center" alignItems="center">
          {displayMovies.map((movie) => (
            <MovieCard
              key={movie.name}
              movie={movie}
              studio={studios[movie.studioId]}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default App;
