import {Router} from 'express';

import {getAllStudios, transferStudio} from '../controllers/studios/index.mjs';
import {getAllMovies, getMoviesAge, getMoviesGenres} from '../controllers/movies/index.mjs';

const router = Router();

router.get('/studios', getAllStudios);

router.get('/movies', getAllMovies);

router.get('/movies/genres', getMoviesGenres);

router.get('/moviesAge', getMoviesAge);

//TODO: 1 add the capability to sell the movie rights to another studio
router.post('/transfer', transferStudio);

export default router;
