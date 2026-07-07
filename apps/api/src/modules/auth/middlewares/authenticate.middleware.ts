import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { IUserRepository, RefreshTokenRepository } from '../../../repositories';
import { TOKENS } from '../../../container/tokens';
import { JwtService } from '../../../common/security/jwt/jwt.service';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const token = authorization.replace('Bearer ', '');
    const jwtService = container.resolve<JwtService>(TOKENS.JwtService);
    const payload = jwtService.verifyAccessToken(token);
    const refreshTokenRepository = container.resolve(RefreshTokenRepository);
    const session = await refreshTokenRepository.findActiveSession(payload.sid);
    if (!session) {
      return res
        .status(401)
        .json({ success: false, message: 'Session expired or invalid' });
    }
    const userRepository = container.resolve<IUserRepository>(
      TOKENS.UserRepository,
    );
    const user = await userRepository.findById(payload.sub);
    if (!user || user.isActive !== true) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    req.auth = {
      userId: payload.sub,
      sessionId: payload.sid,
      roles: payload.roles,
    };
    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    return res
      .status(401)
      .json({ success: false, message: 'Invalid or expired token' });
  }
}
