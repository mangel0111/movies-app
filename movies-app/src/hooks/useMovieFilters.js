import { useState, useEffect } from "react";

function useMovieFilters(movies) {
  const [filters, setFilters] = useState({
    title: "",
    genre: null,
    price: { min: 0, max: "" },
  });

  const [displayMovies, setDisplayMovies] = useState(movies);

  const onChangeFilter = (filter, value) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  useEffect(() => {
    let filteredMovies = [...movies];

    if (filters.title) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.name.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.genre) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.genre === filters.genre.id
      );
    }

    if (filters.price.min) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.price >= filters.price.min
      );
    }

    if (filters.price.max) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.price <= filters.price.max
      );
    }

    setDisplayMovies(filteredMovies);
  }, [movies, filters.title, filters.genre, filters.price]);

  return {
    filters,
    displayMovies,
    onChangeFilter,
  };
}

export default useMovieFilters;
