'use strict';

const { randomUUID } = require('crypto');
const { QueryTypes } = require('sequelize');

const ROLE_NAMES = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'USER'];

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const existingRoles = await queryInterface.sequelize.query(
      'SELECT name FROM roles WHERE name IN (:roleNames)',
      {
        replacements: { roleNames: ROLE_NAMES },
        type: QueryTypes.SELECT,
      },
    );

    const existingRoleNames = new Set(existingRoles.map((role) => role.name));

    const roles = ROLE_NAMES.map((name) => ({
      id: randomUUID(),
      name,
      description: `${name} role`,
      created_at: now,
      updated_at: now,
    })).filter((role) => !existingRoleNames.has(role.name));

    if (roles.length === 0) {
      return;
    }

    await queryInterface.bulkInsert('roles', roles);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', {
      name: ROLE_NAMES,
    });
  },
};