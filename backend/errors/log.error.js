import expressWinston from 'express-winston';
import winston from 'winston';

export default expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.cli(),
    }),
    new winston.transports.File({
      filename: 'error.log',
      format: winston.format.json(),
      maxFiles: 4,
      maxsize: 8 * 1024 * 1024 * 4,
    }),
  ],
});
