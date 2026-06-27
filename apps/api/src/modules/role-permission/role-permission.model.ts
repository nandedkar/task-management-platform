import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../config/database';

export class RolePermission extends Model {}

RolePermission.init(
  {
    roleId: {
      type: DataTypes.UUID,
      field: 'role_id',
    },

    permissionId: {
      type: DataTypes.UUID,
      field: 'permission_id',
    },
  },
  {
    sequelize,

    tableName: 'role_permissions',

    timestamps: false,
  },
);
