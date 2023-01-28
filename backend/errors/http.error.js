import HttpError from '../utils/errors/HttpError.js';

export default function httpErrorHandler(error, request, response, next) {
  if (error instanceof HttpError) {
    const { code, message } = error;
    response.status(code).send({ message });
  } else {
    next(error);
  }
}
