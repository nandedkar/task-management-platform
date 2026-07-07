import { HttpStatus } from "../constants/http-status";
import { AppException } from "./app.exception";

export class NotFoundException extends AppException {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, message);
  }
}
