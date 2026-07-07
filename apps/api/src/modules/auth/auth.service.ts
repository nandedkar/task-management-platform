import { inject, injectable } from 'tsyringe';

import { Transaction } from 'sequelize';

import { TOKENS } from '../../container/tokens';

import { IUserRepository } from '../../repositories/interfaces/user.repository.interface';
import { IRoleRepository } from '../../repositories/interfaces/role.repository.interface';
import { IUserRoleRepository } from '../../repositories/interfaces/user-role.repository.interface';

import { PasswordService } from '../../common/security/password/password.service';

import { RegisterRequestDto } from './dto/register.request.dto';
import { RegisterResponseDto } from './dto/register.response.dto';

import { AuthMapper } from './auth.mapper';

import { Roles } from '../../common/constants/roles';

import { withTransaction } from '../../common/database/transaction';
import { ConflictException } from '../../common/exceptions/conflict.exception';
import { NotFoundException } from '../../common/exceptions/not-found.exception';
import { CredentialService } from './credential.service';
import { LoginRequestDto } from './dto/login.request.dto';
import { TokenService } from './token.service';
import { SessionService } from './session.service';
import { TokenHashService } from '../../common/security/hash/token-hash.service';

@injectable()
export class AuthService {
  constructor(
    @inject(TOKENS.UserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TOKENS.RoleRepository)
    private readonly roleRepository: IRoleRepository,

    @inject(TOKENS.UserRoleRepository)
    private readonly userRoleRepository: IUserRoleRepository,

    @inject(TOKENS.PasswordService)
    private readonly passwordService: PasswordService,

    @inject(TOKENS.CredentialService)
    private readonly credentialService: CredentialService,

    @inject(TOKENS.SessionService)
    private readonly sessionService: SessionService,

    @inject(TOKENS.TokenService)
    private readonly tokenService: TokenService,

    @inject(TOKENS.TokenHashService)
    private readonly tokenHashService: TokenHashService,
  ) {}

  async register(dto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await this.passwordService.hash(dto.password);

    return withTransaction(async (transaction: Transaction) => {
      const user = await this.userRepository.create(
        {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          passwordHash,
        },
        {
          transaction,
        },
      );

      const role = await this.roleRepository.findByName(Roles.USER);

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      await this.userRoleRepository.assignRole(user.id, role.id, {
        transaction,
      });

      return AuthMapper.toRegisterResponse(user);
    });
  }

  async login(dto: LoginRequestDto) {
    //Step 1: Verify the user's credentials (email and password)
    const user = await this.credentialService.verifyCredentials(
      dto.email,
      dto.password,
    );
    //step 2: Load the user's roles
    const userRoles = await this.userRoleRepository.findUserRoles(user.id);
    const roles = userRoles.map((role) => role.dataValues.roleName);

    // Step 3: Generate Tokens
    const { sessionId, accessToken, refreshToken, refreshTokenHash } =
      await this.tokenService.generateAccessToken({
        id: user.id,
        roles,
      });

    await this.sessionService.createSession(user.id, {
      sessionId,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return AuthMapper.toLoginResponse(user, accessToken, refreshToken);
  }

  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userRoles = await this.userRoleRepository.findUserRoles(user.id);
    const roles = userRoles.map((role) => role.dataValues.roleName);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles,
    };
  }
}
