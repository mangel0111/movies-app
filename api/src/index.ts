import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';

import logger from './util/logger';
import { getMovieAge, getMovies, transferMovie } from './controllers/movies';
import { getStudios } from './controllers/studios';
import { getGenres } from './controllers/genres';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
// helmet adds many response headers to improve security (could help on 7. Vulnerabilities fixes). Source: https://helmetjs.github.io/)
app.use(helmet());
app.use(morgan('combined', { stream: logger.stream }));

app.get('/studios', getStudios);
app.get('/movies', getMovies);
app.get('/genres', getGenres);
app.get('/movieAge', getMovieAge);
app.post('/transfer', transferMovie);

// Error handler middleware
app.use((error, req, res, _next) => {
  let statusCode = 500;
  let message = 'Unexpected error. Please contact your system administrator.';
  if ('statusCode' in error) { // it is AppError
    statusCode = error.statusCode;
    message = error.message;
  }

  const body = Object.keys(req.body).length ? `\nBody: ${JSON.stringify(req.body)}` : '';
  const query = Object.keys(req.query).length ? `\nQuery: ${JSON.stringify(req.query)}` : '';
  const params = Object.keys(req.params).length ? `\nParams: ${JSON.stringify(req.params)}` : '';

  const logMessage = `${statusCode} - ${error.stack}${body}${query}${params}`;
  logger.error(logMessage);
  res.status(statusCode).json({ message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info('SERVER READY');
  logger.info(`Listening on port ${port}`);
});
