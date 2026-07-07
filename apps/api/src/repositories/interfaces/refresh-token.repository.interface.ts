import { IBaseRepository } from './base.repository.interface';
import { RefreshToken } from '../../modules/refresh-token/refresh-token.model';
import { SessionDto } from '../../modules/auth/dto/session.dto';
import { CreateOptions } from 'sequelize';

export interface IRefreshTokenRepository extends IBaseRepository<RefreshToken> {
  revokeToken(tokenHash: string): Promise<void>;

  findValidToken(tokenHash: string): Promise<RefreshToken | null>;

  createSession(
    userId: string,
    session: SessionDto,
    options?: CreateOptions,
  ): Promise<RefreshToken>;

  findBySessionId(sessionId: string): Promise<RefreshToken | null>;

  revokeSession(sessionId: string, options?: CreateOptions): Promise<void>;

  revokeAllUserSessions(userId: string, options?: CreateOptions): Promise<void>;
}
