import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors'; // needed for easier async error handling (until Express 5.x arrives)
import AppError from './src/util/AppError';
import logger, { morganOptions } from './src/util/logger';
import { getMovies, transferMovie } from './src/controllers/movies';
import { getGenres } from './src/controllers/genres';
import { getStudios } from './src/controllers/studios';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
// helmet adds many response headers to improve security (could help on 7. Vulnerabilities fixes). Source: https://helmetjs.github.io/)
app.use(helmet());
app.use(morgan('combined', morganOptions));

app.get('/studios', getStudios);
app.get('/movies', getMovies);
app.get('/genres', getGenres);
app.post('/transfer', transferMovie);

app.use((error: Error | AppError, req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  let message = 'Unexpected error. Please contact your system administrator.';
  if ('statusCode' in error) {
    // it is AppError
    statusCode = error.statusCode;
    message = error.message;
  }

  const body = Object.keys(req.body).length ? `\nBody: ${JSON.stringify(req.body)}` : '';
  const query = Object.keys(req.query).length ? `\nQuery: ${JSON.stringify(req.query)}` : '';
  const params = Object.keys(req.params).length ? `\nParams: ${JSON.stringify(req.params)}` : '';

  const logMessage = `${statusCode} - ${error.stack}${body}${query}${params}`;
  logger.error(logMessage); // replace with logger
  res.status(statusCode).json({ message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`SERVER READY. Listening on port ${port}`);
});
