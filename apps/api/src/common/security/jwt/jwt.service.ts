import jwt from 'jsonwebtoken';
import { authConfig } from '../../../config';
import { AccessTokenPayload, RefreshTokenPayload } from './jwt.types';

export class JwtService {
  signAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(
      payload,
      authConfig.accessSecret as jwt.Secret,
      {
        issuer: 'workspace-api',
        audience: 'workspace-client',
        expiresIn: authConfig.accessExpiry as jwt.SignOptions['expiresIn'],
      } as jwt.SignOptions,
    );
  }

  signRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(
      payload,
      authConfig.refreshSecret as jwt.Secret,
      {
        issuer: 'workspace-api',
        audience: 'workspace-client',
        expiresIn: authConfig.refreshExpiry as jwt.SignOptions['expiresIn'],
      } as jwt.SignOptions,
    );
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return jwt.verify(token, authConfig.accessSecret) as AccessTokenPayload;
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    return jwt.verify(token, authConfig.refreshSecret) as RefreshTokenPayload;
  }
}
