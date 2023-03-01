import "./App.css";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import getMovies from "../../api/movies";
import getStudios from "../../api/studios";
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
        <h3>Images:</h3>
        <MovieFilters
          filters={filters}
          onChangeFilter={onChangeFilter}
          genreOptions={['1']}
        />
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
