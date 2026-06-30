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

import { EmailAlreadyExistsError, RoleNotFoundError } from './auth.errors';

import { Roles } from '../../common/constants/roles';

import { withTransaction } from '../../common/database/transaction';

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
  ) {}

  async register(dto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new EmailAlreadyExistsError();
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
        throw new RoleNotFoundError();
      }

      await this.userRoleRepository.assignRole(user.id, role.id, {
        transaction,
      });

      return AuthMapper.toRegisterResponse(user);
    });
  }
}
