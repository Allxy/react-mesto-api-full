import winston from 'winston';
import expressWinston from 'express-winston';

export default expressWinston.logger({
  transports: [new winston.transports.Console({
    format: winston.format.cli(),
  }), new winston.transports.File({
    filename: 'request.log',
    format: winston.format.json(),
    maxFiles: 4,
    maxsize: 8 * 1024 * 1024 * 4,
  })],
});
