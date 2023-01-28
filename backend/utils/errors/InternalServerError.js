import { INTERNAL_SERVER_ERR_CODE } from '../constants.js';
import HttpError from './HttpError.js';

export default class InternalServerError extends HttpError {
  constructor(message) {
    super(INTERNAL_SERVER_ERR_CODE, message);
    this.name = 'InternalServerError';
  }
}
