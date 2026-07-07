import { HttpStatus } from '../constants/http-status';
import { AppException } from './app.exception';

export class ForbiddenException extends AppException {
  constructor(message: string) {
    super(HttpStatus.FORBIDDEN, message);
  }
}
