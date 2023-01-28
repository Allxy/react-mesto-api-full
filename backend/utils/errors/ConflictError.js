import { CONFLICT_ERR_CODE } from '../constants.js';
import HttpError from './HttpError.js';

export default class ConflictError extends HttpError {
  constructor(message) {
    super(CONFLICT_ERR_CODE, message);
    this.name = 'ConflictError';
  }
}
