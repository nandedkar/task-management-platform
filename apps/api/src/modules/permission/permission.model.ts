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

export class Permission extends BaseModel<
  InferAttributes<Permission>,
  InferCreationAttributes<Permission>
> {
  declare code: string;
  declare description: CreationOptional<string>;
}

Permission.init(
  {
    ...auditColumns,
    code: {
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
    tableName: 'permissions',
    ...commonModelOptions,
  },
);
