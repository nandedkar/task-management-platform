'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles', {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: 'users',
          key: 'id',
        },

        onDelete: 'CASCADE',
      },

      role_id: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: 'roles',
          key: 'id',
        },

        onDelete: 'CASCADE',
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('user_roles', {
      fields: ['user_id', 'role_id'],
      type: 'unique',
      name: 'uk_user_roles',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_roles');
  },
};
