import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';

export class UserRole extends Model {}

UserRole.init(
  {
    userId: {
      type: DataTypes.UUID,
      field: 'user_id',
      allowNull: false,
    },

    roleId: {
      type: DataTypes.UUID,
      field: 'role_id',
      allowNull: false,
    },
  },
  {
    sequelize,

    tableName: 'user_roles',

    timestamps: false,
  },
);
