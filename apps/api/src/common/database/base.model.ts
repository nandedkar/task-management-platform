import {
  CreationOptional,
  Model,
  ModelAttributes,
} from 'sequelize';

export abstract class BaseModel<
  TModelAttributes extends object = ModelAttributes,
  TCreationAttributes extends object = TModelAttributes,
> extends Model<TModelAttributes, TCreationAttributes> {
  declare id: CreationOptional<string>;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

  declare deletedAt: CreationOptional<Date | null>;
}
