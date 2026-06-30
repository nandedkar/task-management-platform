export const TOKENS = {
  UserRepository: Symbol('UserRepository'),
  RoleRepository: Symbol('RoleRepository'),
  PermissionRepository: Symbol('PermissionRepository'),
  AuthService: Symbol('AuthService'),
  PasswordService: Symbol('PasswordService'),
  JwtService: Symbol('JwtService'),
  RefreshTokenRepository: Symbol('RefreshTokenRepository'),
  UserRoleRepository: Symbol('UserRoleRepository'),
} as const;
