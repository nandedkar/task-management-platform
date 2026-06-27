import { Role } from "../../modules/role/role.model";
import { SequelizeBaseRepository } from "./base.repository";
import { IRoleRepository } from "../interfaces/role.repository.interface";

export class RoleRepository
  extends SequelizeBaseRepository<Role>
  implements IRoleRepository {

  constructor() {
    super(Role);
  }

  async findByName(
    name: string
  ): Promise<Role | null> {

    return this.findOne({
      where: { name },
    });
  }
}