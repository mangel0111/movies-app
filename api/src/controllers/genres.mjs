import { GENRE_ID } from "../../constants/studio_constants.mjs";

export const getGenres = (req, res) => {
  const genres = Object.keys(GENRE_ID)
    .map(key => ({ id: GENRE_ID[key], value: key }))
    .sort((a, b) => a.value > b.value ? 1 : -1);
  res.json(genres);
}
