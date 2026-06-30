import { DataTypes } from "sequelize";

export const auditColumns = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
  },

  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
  },
};