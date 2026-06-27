import { Permission } from '../../modules/permission/permission.model';
import { SequelizeBaseRepository } from './base.repository';
import { IPermissionRepository } from '../interfaces/permission.repository.interface';

export class PermissionRepository
  extends SequelizeBaseRepository<Permission>
  implements IPermissionRepository
{
  constructor() {
    super(Permission);
  }

  async findByCode(code: string): Promise<Permission | null> {
    return this.findOne({
      where: { code },
    });
  }
}
