'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('refresh_tokens', 'session_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });
    await queryInterface.addColumn('refresh_tokens', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('refresh_tokens', 'session_id');
    await queryInterface.removeColumn('refresh_tokens', 'updated_at');
  },
};
