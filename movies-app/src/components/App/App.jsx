import "./App.css";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import getMovies from "../../api/movies";
import getStudios from "../../api/studios";
import getGenre from "../../api/genre";
import MovieCard from "../MovieCard";
import MovieFilters from "../MovieFilters";
import useMovieFilters from "../../hooks/useMovieFilters";

function App() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [studios, setStudios] = useState([]);
  const [studiosMap, setStudiosMap] = useState({});
  const { filters, onChangeFilter, displayMovies } = useMovieFilters(movies);

  useEffect(() => {
    getStudios().then((response) => {
      const studiosMapBuilder = {};
      response.forEach((studio) => {
        studiosMapBuilder[studio.id] = studio.name;
      });
      setStudios(response);
      setStudiosMap(studiosMapBuilder);
    });

    getGenre().then((response) => setGenre(response));
    getMovies().then((response) => setMovies(response));
  }, []);

  const handleSellMovie = () => {
    getMovies().then((response) => setMovies(response));
  }

  return (
    <div className="App">
      <div className="App-studios App-flex">
        <h3>Images:</h3>
        <MovieFilters
          filters={filters}
          onChangeFilter={onChangeFilter}
          genreOptions={genre}
        />
        <Grid container justify="center" alignItems="center">
          {displayMovies.map((movie) => (
            <MovieCard
              key={movie.name}
              movie={{ ...movie, studio: studiosMap[movie.studioId] }}
              studios={studios}
              handleSellMovie={handleSellMovie}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default App;
