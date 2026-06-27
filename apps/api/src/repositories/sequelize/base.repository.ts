/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Model,
  ModelStatic,
  FindOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
} from 'sequelize';

import { IBaseRepository } from '../interfaces/base.repository.interface';

export abstract class SequelizeBaseRepository<
  T extends Model,
> implements IBaseRepository<T> {
  constructor(protected readonly model: ModelStatic<T>) {}

  async findById(id: string): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findOne(options: FindOptions): Promise<T | null> {
    return this.model.findOne(options);
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    return this.model.findAll(options);
  }

  async create(data: Partial<T>, options?: CreateOptions): Promise<T> {
    return this.model.create(data as any, options);
  }

  async update(
    id: string,
    data: Partial<T>,
    options?: UpdateOptions,
  ): Promise<[number]> {
    return this.model.update(data as unknown as Record<string, unknown>, {
      where: { id } as any,
      ...options,
    });
  }

  async delete(id: string, options?: DestroyOptions): Promise<number> {
    return this.model.destroy({
      where: { id } as any,
      ...options,
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.model.count({
      where: { id } as any,
    });

    return count > 0;
  }

  async count(options?: FindOptions): Promise<number> {
    return this.model.count(options);
  }
}
