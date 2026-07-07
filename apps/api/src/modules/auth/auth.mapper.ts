import { User } from '../user/user.model';
import {
  LoginResponseDto,
  RegisterResponseDto,
} from './dto/register.response.dto';

/**
 * AuthMapper is responsible for transforming User entities into
 * authentication-related DTOs (Data Transfer Objects).
 */
export class AuthMapper {
  static toRegisterResponse(user: User): RegisterResponseDto {
    return {
      id: user.id,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
    };
  }

  static toLoginResponse(
    user: User,
    accessToken: string,
    refreshToken: string,
  ): LoginResponseDto {
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: 'roles' in user ? (user as { roles: string[] }).roles : [],
      },
      accessToken,
      refreshToken,
    };
  }
}
