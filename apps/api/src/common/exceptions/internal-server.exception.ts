import { HttpStatus } from '../constants/http-status';
import { AppException } from './app.exception';

export class InternalServerException extends AppException {
  constructor(message: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}
