import { useState, useEffect } from "react";
import getMovies from "../api/movies";
import getStudios from "../api/studios";
import getGenre from "../api/genre";

function useMoviesBoard() {
  const [genre, setGenre] = useState([]);
  const [movies, setMovies] = useState([]);
  const [studios, setStudios] = useState({});

  useEffect(() => {
    getStudios().then((response) => {
      const studiosMap = response.reduce(
        (acc, s) => Object.assign(acc, { [s.id]: s.name }),
        {}
      );
      setStudios(studiosMap);
    });

    getGenre().then((response) => setGenre(response));
    getMovies().then((response) => setMovies(response));
  }, []);

  const reFetchMovies = () => getMovies().then((response) => setMovies(response));

  return {
    movies,
    genre,
    studios,
    reFetchMovies
  };
}

export default useMoviesBoard;
