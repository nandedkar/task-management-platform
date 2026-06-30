import bcrypt from 'bcrypt';
import { AUTH_CONSTANTS } from '../../../modules/auth/auth.constants';

export class PasswordService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, AUTH_CONSTANTS.BCRYPT_ROUNDS);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
