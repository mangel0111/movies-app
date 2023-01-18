import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors'; // needed for easier async error handling (until Express 5.x arrives)
import AppError from './src/util/AppError';

dotenv.config();
const app = express();

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
  console.log(logMessage); // replace with logger
  res.status(statusCode).json({ message });
});

const load = async () => {
  try {
    app.listen(8080);
    console.log('SERVER READY');
  } catch (ex) {
    console.log(ex);
  }
};

load();
