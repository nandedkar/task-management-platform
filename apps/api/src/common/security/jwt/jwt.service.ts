import jwt from 'jsonwebtoken';

export class JwtService {
  signAccessToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: '15m',
    });
  }

  signRefreshToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '7d',
    });
  }

  verify(token: string) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
  }
}
