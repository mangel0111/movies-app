import "./MoviesBoard.css";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import Notification from "../Notification";
import SellMovieModal from "../SellMovieModal";
import MovieCard from "../MovieCard";
import MovieFilters from "../MovieFilters";
import useMoviesBoard from "../../hooks/useMoviesBoard";
import useSellMovieModal from "../../hooks/useSellMovieModal.js";
import useMovieFilters from "../../hooks/useMovieFilters";

function MoviesBoard() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { movies, studios, genre, reFetchMovies } = useMoviesBoard();
  const { filters, onChangeFilter, displayMovies } = useMovieFilters(movies);

  const {
    isOpen,
    setIsOpen,
    handleSellMovie,
    notification,
    closeNotification,
  } = useSellMovieModal(reFetchMovies);

  return (
    <div className="App">
      <Notification
        message={notification.msg}
        severity={notification.type}
        onClose={closeNotification}
      />

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
              movie={movie}
              studios={studios}
              handleSellMovie={() => {
                setSelectedMovie(movie)
                setIsOpen(true);
              }}
            />
          ))}
        </Grid>
      </div>

      <SellMovieModal
        isOpen={isOpen}
        movie={selectedMovie}
        closeModal={() => setIsOpen(false)}
        onSubmit={handleSellMovie}
        studios={Object.entries(studios).map((studio) => ({
          id: studio[0],
          name: studio[1],
        }))}
      />
    </div>
  );
}

export default MoviesBoard;
