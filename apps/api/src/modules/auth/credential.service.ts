/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'tsyringe';
import { TOKENS } from '../../container/tokens';
import { IUserRepository } from '../../repositories';
import { InvalidCredentialsError } from './auth.errors';

@injectable()
export class CredentialService {
  constructor(
    @inject(TOKENS.UserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TOKENS.PasswordService)
    private readonly passwordService: any,
  ) {}

  async verifyCredentials(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const isValid = await this.passwordService.compare(
      password,
      user.passwordHash,
    );
    if (!isValid) {
      throw new InvalidCredentialsError();
    }
    return user;
  }
}
