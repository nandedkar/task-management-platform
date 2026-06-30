'use strict';

const { randomUUID } = require('crypto');
const { QueryTypes } = require('sequelize');

const PERMISSION_CODES = [
  'USER_CREATE',
  'USER_READ',
  'USER_UPDATE',
  'USER_DELETE',
  'ROLE_READ',
  'ROLE_CREATE',
  'ROLE_UPDATE',
  'ROLE_DELETE',
  'PERMISSION_READ',
  'PROJECT_CREATE',
  'PROJECT_READ',
  'PROJECT_UPDATE',
  'PROJECT_DELETE',
  'TENANT_CREATE',
  'TENANT_UPDATE',
  'AUDIT_LOG_VIEW',
];

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const existingPermissions = await queryInterface.sequelize.query(
      'SELECT code FROM permissions WHERE code IN (:codes)',
      {
        replacements: { codes: PERMISSION_CODES },
        type: QueryTypes.SELECT,
      },
    );

    const existingCodes = new Set(
      existingPermissions.map((permission) => permission.code),
    );

    const permissions = PERMISSION_CODES.map((code) => ({
      id: randomUUID(),
      code,
      description: `${code} permission`,
      createdAt: now,
      updatedAt: now,
    })).filter((permission) => !existingCodes.has(permission.code));

    if (permissions.length === 0) {
      return;
    }

    await queryInterface.bulkInsert('permissions', permissions);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', {
      code: PERMISSION_CODES,
    });
  },
};
