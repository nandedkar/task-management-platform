import { User } from '../../modules/user/user.model';

import { SequelizeBaseRepository } from './base.repository';

import { IUserRepository } from '../interfaces/user.repository.interface';

export class UserRepository
  extends SequelizeBaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({
      where: {
        email,
      },
    });
  }
}
