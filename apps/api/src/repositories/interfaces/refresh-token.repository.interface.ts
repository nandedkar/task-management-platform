import { IBaseRepository } from "./base.repository.interface";
import { RefreshToken } from "../../modules/refresh-token/refresh-token.model";

export interface IRefreshTokenRepository
  extends IBaseRepository<RefreshToken> {

  revokeToken(
    tokenHash: string
  ): Promise<void>;

  findValidToken(
    tokenHash: string
  ): Promise<RefreshToken | null>;
}