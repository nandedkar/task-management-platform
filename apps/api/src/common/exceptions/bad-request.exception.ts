import { HttpStatus } from '../constants/http-status';
import { AppException } from './app.exception';

export class BadRequestException extends AppException {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
