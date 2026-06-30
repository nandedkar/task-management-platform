import { UserRole } from '../../modules/user-role/user-role.model';
import { IUserRoleRepository } from '../interfaces/user-role.repository.interface';
import { SequelizeBaseRepository } from './base.repository';

export class UserRoleRepository
  extends SequelizeBaseRepository<UserRole>
  implements IUserRoleRepository
{
  constructor() {
    super(UserRole);
  }

  async assignRole(
    userId: string,
    roleId: string,
    options = {},
  ): Promise<UserRole> {
    return this.model.create(
      {
        userId,
        roleId,
        createdAt: new Date(),
      },
      options,
    );
  }

  async removeRole(userId: string, roleId: string): Promise<number> {
    return this.model.destroy({
      where: {
        userId,
        roleId,
      },
    });
  }

  async findUserRoles(userId: string): Promise<UserRole[]> {
    return this.model.findAll({
      where: {
        userId,
      },
    });
  }
}
