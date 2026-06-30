import { InitOptions } from 'sequelize';

export const commonModelOptions: Partial<InitOptions> = {
  timestamps: true,
  underscored: true,
  // paranoid: true,
};
