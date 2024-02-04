
import { getMoviesFromStudios } from './helpers.mjs'
import { sony, warner, disney } from '../../constants/studio_constants.mjs'

export function getMovies(req, res) {
    res.json(getMoviesFromStudios([disney, warner, sony], req.query))
};