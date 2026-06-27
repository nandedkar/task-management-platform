'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_permissions', {
      role_id: {
        type: Sequelize.UUID,

        references: {
          model: 'roles',
          key: 'id',
        },

        onDelete: 'CASCADE',
      },

      permission_id: {
        type: Sequelize.UUID,

        references: {
          model: 'permissions',
          key: 'id',
        },

        onDelete: 'CASCADE',
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('role_permissions', {
      fields: ['role_id', 'permission_id'],
      type: 'unique',
      name: 'uk_role_permissions',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('role_permissions');
  },
};
