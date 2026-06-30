import 'reflect-metadata';
import { container } from 'tsyringe';

import { TOKENS } from './tokens';

// Repositories
import { UserRepository } from '../repositories/sequelize/user.repository';
import { RoleRepository } from '../repositories/sequelize/role.repository';
import { PermissionRepository } from '../repositories/sequelize/permission.repository';
import { RefreshTokenRepository } from '../repositories/sequelize/refresh-token.repository';
// Services
import { PasswordService } from '../common/security/password/password.service';
import { JwtService } from '../common/security/jwt/jwt.service';
import { UserRoleRepository } from '../repositories';
import { AuthService } from '../modules/auth/auth.service';

container.registerSingleton(TOKENS.UserRepository, UserRepository);

container.registerSingleton(TOKENS.RoleRepository, RoleRepository);

container.registerSingleton(TOKENS.PermissionRepository, PermissionRepository);

container.registerSingleton(
  TOKENS.RefreshTokenRepository,
  RefreshTokenRepository,
);
container.registerSingleton(TOKENS.UserRoleRepository, UserRoleRepository);

container.registerSingleton(TOKENS.PasswordService, PasswordService);

container.registerSingleton(TOKENS.JwtService, JwtService);

container.registerSingleton(TOKENS.AuthService, AuthService);
