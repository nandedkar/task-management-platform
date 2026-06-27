import {
  FindOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
} from 'sequelize';

export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;

  findOne(options: FindOptions): Promise<T | null>;

  findAll(options?: FindOptions): Promise<T[]>;

  create(data: Partial<T>, options?: CreateOptions): Promise<T>;

  update(
    id: string,
    data: Partial<T>,
    options?: UpdateOptions,
  ): Promise<[number]>;

  delete(id: string, options?: DestroyOptions): Promise<number>;

  exists(id: string): Promise<boolean>;

  count(options?: FindOptions): Promise<number>;
}
