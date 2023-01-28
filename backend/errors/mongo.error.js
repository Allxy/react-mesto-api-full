import CastError from 'mongoose/lib/error/cast.js';
import MongooseError from 'mongoose/lib/error/mongooseError.js';
import ValidationError from 'mongoose/lib/error/validation.js';
import { BAD_REQUEST_ERR_CODE, CONFLICT_ERR_CODE } from '../utils/constants.js';

export default function mongoErorHandler(error, request, response, next) {
  if (error instanceof MongooseError) {
    if (error instanceof ValidationError) {
      const { message } = error;
      response.status(BAD_REQUEST_ERR_CODE).send({ message });
    } else if (error instanceof CastError) {
      const { value, kind } = error;
      response.status(BAD_REQUEST_ERR_CODE).send({ message: `Value '${value}' is not valid ${kind}` });
    } else {
      next(error);
    }
  } else if (error.code === 11000) {
    response.status(CONFLICT_ERR_CODE).send({ message: 'Conflict: duplicate unique field in database' });
  } else {
    next(error);
  }
}
