import jwt from 'jsonwebtoken';
import { BAD_TOKEN, UNAUTHORIZED_ERR_CODE } from '../utils/constants.js';

export default function authErrorHandler(error, request, response, next) {
  if (error instanceof jwt.JsonWebTokenError) {
    response.status(UNAUTHORIZED_ERR_CODE).send({ message: BAD_TOKEN });
  } else {
    next(error);
  }
}
