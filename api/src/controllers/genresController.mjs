import { GENRE_STRING } from '../../constants/studio_constants.mjs'

export function getGenres (req, res) {
    const genres = Object.keys(GENRE_STRING).map(key => ({
        key,
        text: GENRE_STRING[key],
    }));
    res.json(genres)
}