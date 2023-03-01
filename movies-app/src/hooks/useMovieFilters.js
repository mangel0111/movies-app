import { useState, useEffect } from "react";

function useMovieFilters(movies) {
  const [filters, setFilters] = useState({
    title: "",
    genre: "",
    price: "",
  });

  const [displayMovies, setDisplayMovies] = useState(movies);

  const onChangeFilter = (filter, value) => {
    setFilters((prev) => ({ ...prev, [filter]: value.toLowerCase() }));
  };

  useEffect(() => {
    if (filters.title) {
      setDisplayMovies(
        movies.filter((movie) =>
          movie.name.toLowerCase().includes(filters.title)
        )
      );
    } else {
      setDisplayMovies([...movies]);
    }
  }, [movies, filters.title, filters.genre, filters.price]);

  return {
    filters,
    displayMovies,
    onChangeFilter,
  };
}

export default useMovieFilters;
