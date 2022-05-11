import log4js from 'log4js';

const initLogger = () => {
  log4js.configure({
    appenders: {
      console: {type: 'console'}
    },
    categories: {
      default: {appenders: ['console'], level: 'debug'}
    }
  });

  const logger = log4js.getLogger();

  return log4js.connectLogger(logger, {
    level: 'info'
  });
};

export default initLogger;
