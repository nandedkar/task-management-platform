import jwt from 'jsonwebtoken';
import { authConfig } from '../../../config';

export class JwtService {
  signAccessToken(payload: object) {
    return jwt.sign(payload, authConfig.accessSecret!, {
      expiresIn: '15m',
    });
  }

  signRefreshToken(payload: object) {
    return jwt.sign(payload, authConfig.refreshSecret!, {
      expiresIn: '7d',
    });
  }

  verify(token: string) {
    return jwt.verify(token, authConfig.accessSecret!);
  }
}
