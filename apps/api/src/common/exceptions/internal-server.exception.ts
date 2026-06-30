import { AppException } from './app.exception';

export class InternalServerException extends AppException {
  constructor(message: string) {
    super(500, message);
  }
}
