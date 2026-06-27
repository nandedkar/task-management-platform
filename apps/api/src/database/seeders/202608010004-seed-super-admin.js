'use strict';

const { randomUUID } = require('crypto');
const bcrypt = require('bcryptjs');
const { QueryTypes } = require('sequelize');

const SUPER_ADMIN_ROLE = 'SUPER_ADMIN';
const BOOTSTRAP_ADMIN_EMAIL = 'admin@example.com';

module.exports = {
  async up(queryInterface) {
    const roleRows = await queryInterface.sequelize.query(
      'SELECT id FROM roles WHERE name = :name LIMIT 1',
      {
        replacements: { name: SUPER_ADMIN_ROLE },
        type: QueryTypes.SELECT,
      },
    );

    const superAdminRole = roleRows[0];
    if (!superAdminRole) {
      throw new Error('SUPER_ADMIN role not found. Seed roles first.');
    }

    const existingUserRows = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = :email LIMIT 1',
      {
        replacements: { email: BOOTSTRAP_ADMIN_EMAIL },
        type: QueryTypes.SELECT,
      },
    );

    const now = new Date();
    let userId = existingUserRows[0] && existingUserRows[0].id;

    if (!userId) {
      const passwordHash = await bcrypt.hash('ChangeMe123!', 12);
      userId = randomUUID();

      await queryInterface.bulkInsert('users', [
        {
          id: userId,
          first_name: 'System',
          last_name: 'Administrator',
          email: BOOTSTRAP_ADMIN_EMAIL,
          password_hash: passwordHash,
          is_active: true,
          created_at: now,
          updated_at: now,
        },
      ]);
    }

    const existingUserRoleRows = await queryInterface.sequelize.query(
      'SELECT user_id, role_id FROM user_roles WHERE user_id = :userId AND role_id = :roleId LIMIT 1',
      {
        replacements: { userId, roleId: superAdminRole.id },
        type: QueryTypes.SELECT,
      },
    );

    if (existingUserRoleRows.length === 0) {
      await queryInterface.bulkInsert('user_roles', [
        {
          user_id: userId,
          role_id: superAdminRole.id,
          created_at: now,
        },
      ]);
    }
  },

  async down(queryInterface) {
    const roleRows = await queryInterface.sequelize.query(
      'SELECT id FROM roles WHERE name = :name LIMIT 1',
      {
        replacements: { name: SUPER_ADMIN_ROLE },
        type: QueryTypes.SELECT,
      },
    );

    const existingUserRows = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = :email LIMIT 1',
      {
        replacements: { email: BOOTSTRAP_ADMIN_EMAIL },
        type: QueryTypes.SELECT,
      },
    );

    const userId = existingUserRows[0] && existingUserRows[0].id;
    const superAdminRoleId = roleRows[0] && roleRows[0].id;

    if (userId && superAdminRoleId) {
      await queryInterface.bulkDelete('user_roles', {
        user_id: userId,
        role_id: superAdminRoleId,
      });
    }

    await queryInterface.bulkDelete('users', {
      email: BOOTSTRAP_ADMIN_EMAIL,
    });
  },
};