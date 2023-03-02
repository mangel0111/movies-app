import { SPLAT } from "triple-beam";
import chalk from "chalk";
import winston from "winston";

const env = process.env.NODE_ENV || "";

function getFormatter() {
  const formats = [];
  const isLocal = !env.includes("prod");
  const splatFormatOpt = { colors: false };
  let timestampFormat = "DD-MM-YY HH:mm:ss";

  if (isLocal) {
    timestampFormat = "HH:mm:ss";
    splatFormatOpt.colors = true;
    formats.push(winston.format.colorize());
  }

  formats.push(winston.format.timestamp({ format: timestampFormat }));
  formats.push(
    winston.format.printf((info) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const splat = info[SPLAT];
      const { level, message, timestamp, stack } = info;
      const displayTimestamp = isLocal ? chalk.dim(info.timestamp) : timestamp;
      const displayMessage = `${displayTimestamp} ${level}: ${message}`;

      if (splat) {
        return `${displayMessage} ${util.formatWithOptions(
          splatFormatOpt,
          splat
        )}`;
      }

      if (
        stack &&
        !message.includes("unhandledRejection") &&
        !message.includes("uncaughtException")
      ) {
        return `${displayMessage}\n${info.stack}`;
      }

      return displayMessage;
    })
  );

  return winston.format.combine(...formats);
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  format: winston.format.errors({ stack: true }),
  transports: [
    new winston.transports.Console({
      handleRejections: true,
      handleExceptions: true,
      format: getFormatter(),
    }),
  ],
});

export default logger;
