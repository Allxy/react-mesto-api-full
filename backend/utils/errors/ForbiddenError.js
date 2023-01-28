import { FORBIDDEN_ERR_CODE } from '../constants.js';
import HttpError from './HttpError.js';

export default class ForbiddenError extends HttpError {
  constructor(message) {
    super(FORBIDDEN_ERR_CODE, message);
    this.name = 'ForbiddenError';
  }
}
