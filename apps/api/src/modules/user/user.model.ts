import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '../../config/database';
import { BaseModel } from '../../common/database/base.model';
import { auditColumns } from '../../common/database/common-columns';
import { commonModelOptions } from '../../common/database/model-options';

export class User extends BaseModel<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare passwordHash: string;
  declare isActive: CreationOptional<boolean>;
}

User.init(
  {
    ...auditColumns,
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'first_name',
    },

    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'last_name',
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password_hash',
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
  },
  {
    sequelize,
    tableName: 'users',
    ...commonModelOptions,
  },
);
