import { inject, injectable } from 'tsyringe';
import { randomUUID } from 'crypto';
import { TOKENS } from '../../container/tokens';
import { JwtService } from '../../common/security/jwt/jwt.service';
import { TokenHashService } from '../../common/security/hash/token-hash.service';

@injectable()
export class TokenService {
  constructor(
    @inject(TOKENS.JwtService)
    private readonly jwtService: JwtService,
    @inject(TOKENS.TokenHashService)
    private readonly tokenHashService: TokenHashService,
  ) {}

  async generateAccessToken(user: {
    id: string;
    email: string;
    roles: string[];
  }) {
    //create a session id for the user
    const sessionId = randomUUID();

    const accessToken = this.jwtService.signAccessToken({
      sub: user.id,
      email: user.email,
      sessionId: sessionId,
      roles: user.roles,
    });
    
    const refreshToken = this.jwtService.signRefreshToken({
      sub: user.id,
      sessionId: sessionId,
    });

    const refreshTokenHash = this.tokenHashService.hash(refreshToken);

    return {
      accessToken,
      refreshToken,
      refreshTokenHash,
      sessionId: sessionId,
    };
  }
}
