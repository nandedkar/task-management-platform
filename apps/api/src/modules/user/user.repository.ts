import { SequelizeBaseRepository as BaseRepository } from '../../repositories/sequelize/base.repository';

import { User } from './user.model';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
    });
  }
}
