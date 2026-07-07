/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from 'sequelize';
import { RefreshToken } from '../../modules/refresh-token/refresh-token.model';
import { SequelizeBaseRepository } from './base.repository';
import { IRefreshTokenRepository } from '../interfaces/refresh-token.repository.interface';
import { SessionDto } from '../../modules/auth/dto/session.dto';
import { RepositoryOptions } from '../repository-options';

export class RefreshTokenRepository
  extends SequelizeBaseRepository<RefreshToken>
  implements IRefreshTokenRepository
{
  constructor() {
    super(RefreshToken);
  }

  async findValidToken(tokenHash: string): Promise<RefreshToken | null> {
    return this.findOne({
      where: {
        tokenHash,
        revokedAt: null,
        expiresAt: {
          [Op.gt]: new Date(),
        },
      },
    });
  }

  async revokeToken(tokenHash: string): Promise<void> {
    await this.model.update(
      {
        revokedAt: new Date(),
      },
      {
        where: {
          tokenHash,
        } as any,
      },
    );
  }
  async createSession(
    userId: string,
    session: SessionDto,
    options?: RepositoryOptions,
  ): Promise<RefreshToken> {
    const now = new Date();

    return this.model.create(
      {
        userId,
        sessionId: session.sessionId,
        tokenHash: session.refreshTokenHash,
        expiresAt: session.expiresAt,
        ipAddress: session.ipAddress ?? '',
        userAgent: session.userAgent ?? '',
        deviceName: session.deviceName ?? '',
        createdAt: now,
        updatedAt: now,
      },
      {
        transaction: options?.transaction,
      },
    );
  }

  async findBySessionId(
    sessionId: string,
    options?: RepositoryOptions,
  ): Promise<RefreshToken | null> {
    return this.findOne({
      where: {
        sessionId,
      },
      transaction: options?.transaction,
    });
  }

  async findActiveSession(sessionId: string): Promise<RefreshToken | null> {
    return this.findOne({
      where: {
        sessionId,
        revokedAt: null,
      },
    });
  }

  async revokeSession(
    sessionId: string,
    options?: RepositoryOptions,
  ): Promise<void> {
    await this.model.update(
      {
        revokedAt: new Date(),
      },
      {
        where: {
          sessionId,
        } as any,
        transaction: options?.transaction,
      },
    );
  }
  async revokeAllUserSessions(
    userId: string,
    options?: RepositoryOptions,
  ): Promise<void> {
    await this.model.update(
      {
        revokedAt: new Date(),
      },
      {
        where: {
          userId,
        } as any,
        transaction: options?.transaction,
      },
    );
  }
}
