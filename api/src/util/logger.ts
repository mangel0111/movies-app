import { Request, Response } from 'express';
import { Options } from 'morgan';
import winston, { createLogger } from 'winston';

const levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development' ? 'debug' : 'warn';
};

const colors = { error: 'red', warn: 'yellow', info: 'green', http: 'magenta', debug: 'white' };
winston.addColors(colors);

const baseFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => {
    if (info.message) {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    }
    const symMessage = Symbol('message') as any;
    return info[symMessage] as string;
  }),
);

const colorizedFormat = winston.format.combine(baseFormat, winston.format.colorize({ all: true }));

const transports = [
  new winston.transports.Console({
    format: colorizedFormat,
    handleExceptions: true,
  }),
  new winston.transports.File({
    filename: 'logs/errors.log',
    level: 'error',
    handleExceptions: true,
    handleRejections: true,
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
];

const logger = createLogger({
  level: level(),
  format: baseFormat,
  levels,
  transports,
});

export const morganOptions: Options<Request, Response> = {
  stream: {
    write: function (message: string) {
      logger.info(message.trim());
    },
  },
};

export default logger;
