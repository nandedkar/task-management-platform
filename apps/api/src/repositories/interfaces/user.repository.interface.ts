import { IBaseRepository } from './base.repository.interface';
import { User } from '../../modules/user/user.model';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
