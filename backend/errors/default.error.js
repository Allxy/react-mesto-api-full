import { INTERNAL_ERROR, INTERNAL_SERVER_ERR_CODE } from '../utils/constants.js';

export default function defaultErrorHandler(error, reqг, res, next) {
  res.status(INTERNAL_SERVER_ERR_CODE).send({ message: INTERNAL_ERROR });
  next();
}
