import { getAllMoviesFromStudios, getMovie, sleep } from "../helpers.mjs";
import { movieAge } from "../../constants/studio_constants.mjs";
import AppError from '../util/AppError.mjs';
import { getStudios } from "../helpers.mjs";

export const getMovies = (req, res) => {
  const movies = getAllMoviesFromStudios();
  // await sleep(10000);  // add async above. this allowed me to test loading state in frontend
  res.json(movies);
};

export const transferMovie = (req, res) => {
  const { movieId, studioToId } = req.body;
  const { movie, studioId } = getMovie(movieId);
  const studios = getStudios();
  const studioFrom = studios.find(studio => studio.id === studioId);
  const studioTo = studios.find(studio => studio.id === studioToId);

  if (!movie) throw new AppError('Movie not found.', 404);
  if (!studioTo) throw new AppError('Studio not found.', 404);
  if (studioId === studioToId) {
    throw new AppError('Buyer and seller studios cannot be the same.', 400);
  }
  console.log(studioTo.name, studioTo.money);
  if (movie.price > studioTo.money) {
    throw new AppError('Not enough money for transfer.', 400);
  }

  studioFrom.money += movie.price;
  studioFrom.movies = studioFrom.movies.filter(studioMovie => studioMovie.id !== movie.id);
  studioTo.money -= movie.price;
  studioTo.movies.push(movie);
  res.status(200).json({ message: 'Movie transferred!' });
};

export const getMovieAge = (req, res) => {
  res.json(movieAge);
};
