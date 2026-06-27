'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('refresh_tokens', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },

      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      token_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      device_name: {
        type: DataTypes.STRING(255),
      },

      ip_address: {
        type: DataTypes.STRING(100),
      },

      user_agent: {
        type: DataTypes.TEXT,
      },

      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      revoked_at: {
        type: DataTypes.DATE,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('refresh_tokens');
  },
};
