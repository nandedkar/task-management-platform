import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { sequelize } from '../../config/database';

import { BaseModel } from '../../common/database/base.model';
import { auditColumns } from '../../common/database/common-columns';
import { commonModelOptions } from '../../common/database/model-options';

export class Role extends BaseModel<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  declare name: string;
  declare description: string;
}

Role.init(
  {
    ...auditColumns,
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'roles',
    ...commonModelOptions,
  },
);
