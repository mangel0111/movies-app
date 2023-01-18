import { filterMovies } from './reducer';

const movies = (
  [
    [1, 'Armageddon 1', 6, 1, 300],
    [2, 'Armageddon 2', 6, 1, 400],
    [3, 'Armageddon 3', 6, 2, 500],
    [4, 'Avatar 1', 4, 1, 300],
    [5, 'Avatar 2', 4, 2, 400],
    [6, 'Movie 6', 6, 1, 300],
    [7, 'Movie 7', 6, 2, 400],
  ] as [number, string, number, number, number][]
).map(([id, name, genre, studioId, price]) => ({
  id,
  name,
  genre,
  studioId,
  price,
  img: '',
}));

const studios = (
  [
    [1, 'Disney Studios'],
    [2, 'Warner Bros'],
  ] as [number, string][]
).map(([id, name]) => ({ id, name, shortName: '', logo: '', money: 2000 }));

it('should apply filters and retrieve matching movies with their studio names', () => {
  const filter = { name: 'ar', minPrice: 350, maxPrice: 450, genreId: 6 };

  const moviesList = filterMovies(movies, studios, filter);

  // from movies list above only element with id 2 matches all conditions
  expect(moviesList).toHaveLength(1);

  const movie = moviesList[0];
  expect(movie.name).toBe('Armageddon 2');
  expect(movie.studio).toBe('Disney Studios');
});
