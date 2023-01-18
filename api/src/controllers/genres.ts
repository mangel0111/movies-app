import { RequestHandler } from 'express';
import { GENRE_ID } from '../constants/studio_constants';

export const getGenres: RequestHandler = (req, res) => {
  const keys = Object.keys(GENRE_ID) as Array<keyof typeof GENRE_ID>;
  const genres = keys
    .map((key) => ({ id: GENRE_ID[key], value: key }))
    .sort((a, b) => (a.value > b.value ? 1 : -1));
  res.json(genres);
};
