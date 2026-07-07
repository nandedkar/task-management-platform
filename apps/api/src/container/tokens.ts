export const TOKENS = {
  UserRepository: Symbol('UserRepository'),
  RoleRepository: Symbol('RoleRepository'),
  PermissionRepository: Symbol('PermissionRepository'),
  AuthService: Symbol('AuthService'),
  PasswordService: Symbol('PasswordService'),
  JwtService: Symbol('JwtService'),
  RefreshTokenRepository: Symbol('RefreshTokenRepository'),
  UserRoleRepository: Symbol('UserRoleRepository'),
  CredentialService: Symbol('CredentialService'),
  TokenHashService: Symbol('TokenHashService'),
  SessionService: Symbol('SessionService'),
  TokenService: Symbol('TokenService'),
} as const;
