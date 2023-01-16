import winston from 'winston';

const levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development' ? 'debug' : 'warn';
};

const colors = { error: 'red', warn: 'yellow', info: 'green', http: 'magenta', debug: 'white' };
winston.addColors(colors);

const baseFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => {
      return info.message
        ? `${info.timestamp} ${info.level}: ${info.message}`
        : info[Symbol.for('message')];
    },
  ),
);

const colorizedFormat = winston.format.combine(
  baseFormat,
  winston.format.colorize({ all: true }),
);

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

const logger = new winston.createLogger({
  level: level(),
  format: baseFormat,
  levels,
  transports
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

export default logger;
