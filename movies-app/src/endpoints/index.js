import axios from 'axios-config';

export const getMovies = async () => axios.get(
  '/movies',
);

export const getStudios = async () => axios.get(
  '/studios',
);

export const getGenres = async () => axios.get(
  '/genres',
);

export const transfer = async (movieId, sellerId, buyerId) => axios.post('/transfer', {
  movieId,
  sellerId,
  buyerId,
});
