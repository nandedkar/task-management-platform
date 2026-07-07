import { inject, injectable } from 'tsyringe';
import { TOKENS } from '../../container/tokens';
import { IRefreshTokenRepository } from '../../repositories/interfaces/refresh-token.repository.interface';
import { RepositoryOptions } from '../../repositories/repository-options';
import { SessionDto } from './dto/session.dto';

@injectable()
export class SessionService {
  constructor(
    @inject(TOKENS.RefreshTokenRepository)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async createSession(
    userId: string,
    session: SessionDto,
    options?: RepositoryOptions,
  ) {
    return this.refreshTokenRepository.createSession(userId, session, options);
  }

  async revokeSession(sessionId: string, options?: RepositoryOptions) {
    return this.refreshTokenRepository.revokeSession(sessionId, options);
  }

  async revokeAllUserSessions(userId: string, options?: RepositoryOptions) {
    return this.refreshTokenRepository.revokeAllUserSessions(userId, options);
  }
}
