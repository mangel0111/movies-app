
import {
    getMovieStudio,
    getStudio,
    removeMovieFromStudio
} from './helpers.mjs'
import { sony, warner, disney } from '../../constants/studio_constants.mjs'

export function transferMovie(req, res) {
    const { movieId, studioId } = req.body;
    const studios = [disney, warner, sony];
    const movieStudio = getMovieStudio(movieId, studios);
    if(movieStudio.id === studioId) {
      let error = new Error("Buyer and seller can't be the same");
      error.status = 400;
      throw error;
    }
    const studioTo = getStudio(studioId, studios);
    const {remainingMovies, removedMovie} = removeMovieFromStudio(movieStudio, movieId);
    studioTo.movies.push(removedMovie);
    movieStudio.movies = remainingMovies;
    res.json({ message: 'Book successfully transfered'})
}