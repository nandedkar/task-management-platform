import { HttpStatus } from '../constants/http-status';
import { AppException } from './app.exception';

export class UnauthorizedException extends AppException {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
