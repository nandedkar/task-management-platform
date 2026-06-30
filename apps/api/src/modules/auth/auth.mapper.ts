import { User } from '../user/user.model';
import { RegisterResponseDto } from './dto/register.response.dto';

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
}
