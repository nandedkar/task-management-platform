import { IBaseRepository } from "./base.repository.interface";
import { Permission } from "../../modules/permission/permission.model";

export interface IPermissionRepository
  extends IBaseRepository<Permission> {

  findByCode(
    code: string
  ): Promise<Permission | null>;
}