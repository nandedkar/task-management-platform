import { HttpStatus } from '../constants/http-status';
import { AppException } from './app.exception';

export class ConflictException extends AppException {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, message);
  }
}
