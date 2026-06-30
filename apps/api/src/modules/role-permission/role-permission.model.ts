import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../config/database';

export class RolePermission extends Model {}

RolePermission.init(
  {
    roleId: {
      type: DataTypes.UUID,
      field: 'role_id',
      allowNull: false,
      primaryKey: true,
    },

    permissionId: {
      type: DataTypes.UUID,
      field: 'permission_id',
      allowNull: false,
      primaryKey: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: false,
    },
  },
  {
    sequelize,

    tableName: 'role_permissions',

    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  },
);
