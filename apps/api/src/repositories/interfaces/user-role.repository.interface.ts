import { CreateOptions } from 'sequelize';
import { UserRole } from '../../modules/user-role/user-role.model';
import { IBaseRepository } from './base.repository.interface';

export interface IUserRoleRepository extends IBaseRepository<UserRole> {
  assignRole(
    userId: string,
    roleId: string,
    options?: CreateOptions,
  ): Promise<UserRole>;

  removeRole(userId: string, roleId: string): Promise<number>;

  findUserRoles(userId: string): Promise<UserRole[]>;
}
