import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelize } from '../../config/database';

export class RefreshToken extends Model<
  InferAttributes<RefreshToken>,
  InferCreationAttributes<RefreshToken>
> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare tokenHash: string;
  declare deviceName: string;
  declare ipAddress: string;
  declare userAgent: string;
  declare expiresAt: Date;
  declare revokedAt: Date | null;
  declare createdAt: CreationOptional<Date>;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      field: 'user_id',
    },

    tokenHash: {
      type: DataTypes.STRING,
      field: 'token_hash',
    },

    deviceName: {
      type: DataTypes.STRING,
      field: 'device_name',
    },

    ipAddress: {
      type: DataTypes.STRING,
      field: 'ip_address',
    },

    userAgent: {
      type: DataTypes.TEXT,
      field: 'user_agent',
    },

    expiresAt: {
      type: DataTypes.DATE,
      field: 'expires_at',
    },

    revokedAt: {
      type: DataTypes.DATE,
      field: 'revoked_at',
    },

    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
  },
  {
    sequelize,
    tableName: 'refresh_tokens',
    timestamps: false,
  },
);
