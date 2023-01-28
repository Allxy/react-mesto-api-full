import jwt from 'jsonwebtoken';
import { AUTH_REQUIRED, BAD_TOKEN, BAD_TOKEN_TYPE } from '../utils/constants.js';
import { UnauthorizedError } from '../utils/errors/index.js';

export default function auth(request, resource, next) {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedError(AUTH_REQUIRED);
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError(BAD_TOKEN_TYPE);
    }

    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    request.user = payload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError(BAD_TOKEN));
    } else {
      next(error);
    }
  }

  next();
}
