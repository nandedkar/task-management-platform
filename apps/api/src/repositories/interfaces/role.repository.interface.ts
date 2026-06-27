import { IBaseRepository } from "./base.repository.interface";
import { Role } from "../../modules/role/role.model";

export interface IRoleRepository
  extends IBaseRepository<Role> {

  findByName(
    name: string
  ): Promise<Role | null>;
}