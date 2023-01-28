import { INTERNAL_ERROR } from '../utils/constants.js';

export default function errorHandler(error, req, res, next) {
  const status = error.code || 500;
  const message = error.message || INTERNAL_ERROR;

  res.status(status).send({ message });
  next();
}
