import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import { getMovies } from "./controllers/moviesController.mjs";
import { getStudios } from "./controllers/studiosController.mjs";
import { getGenres } from "./controllers/genresController.mjs";
import { transferMovie } from "./controllers/transferController.mjs";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('common'));

const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).send(error.message);
}

app.get('/studios', getStudios);
app.get('/movies', getMovies);
app.get('/genres', getGenres)
app.post('/transfer', transferMovie);

app.use(errorHandler);

app.listen(3001)
