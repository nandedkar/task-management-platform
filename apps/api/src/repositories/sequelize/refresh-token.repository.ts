/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from 'sequelize';
import { RefreshToken } from '../../modules/refresh-token/refresh-token.model';
import { SequelizeBaseRepository } from './base.repository';
import { IRefreshTokenRepository } from '../interfaces/refresh-token.repository.interface';

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
}
