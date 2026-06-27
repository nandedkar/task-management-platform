'use strict';

const { Op, QueryTypes } = require('sequelize');

const ROLE_NAMES = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'USER'];

const MANAGER_PERMISSION_CODES = [
  'PROJECT_READ',
  'PROJECT_CREATE',
  'PROJECT_UPDATE',
];

const USER_PERMISSION_CODES = ['PROJECT_READ'];

function permissionIdsByCodes(permissions, codes) {
  const map = new Map(permissions.map((permission) => [permission.code, permission.id]));

  const missingCodes = codes.filter((code) => !map.has(code));
  if (missingCodes.length > 0) {
    throw new Error(`Missing permissions: ${missingCodes.join(', ')}`);
  }

  return codes.map((code) => map.get(code));
}

function permissionIdsForRole(roleName, permissions) {
  if (roleName === 'SUPER_ADMIN') {
    return permissions.map((permission) => permission.id);
  }

  if (roleName === 'ADMIN') {
    return permissions
      .filter(
        (permission) =>
          permission.code.startsWith('USER_') ||
          permission.code.startsWith('ROLE_') ||
          permission.code.startsWith('PROJECT_'),
      )
      .map((permission) => permission.id);
  }

  if (roleName === 'MANAGER') {
    return permissionIdsByCodes(permissions, MANAGER_PERMISSION_CODES);
  }

  if (roleName === 'USER') {
    return permissionIdsByCodes(permissions, USER_PERMISSION_CODES);
  }

  return [];
}

async function buildRolePermissionRows(queryInterface) {
  const roles = await queryInterface.sequelize.query(
    'SELECT id, name FROM roles WHERE name IN (:roleNames)',
    {
      replacements: { roleNames: ROLE_NAMES },
      type: QueryTypes.SELECT,
    },
  );

  const roleMap = new Map(roles.map((role) => [role.name, role.id]));
  const missingRoles = ROLE_NAMES.filter((roleName) => !roleMap.has(roleName));
  if (missingRoles.length > 0) {
    throw new Error(`Missing roles: ${missingRoles.join(', ')}`);
  }

  const permissions = await queryInterface.sequelize.query(
    'SELECT id, code FROM permissions',
    {
      type: QueryTypes.SELECT,
    },
  );

  if (permissions.length === 0) {
    return [];
  }

  const now = new Date();
  const rolePermissions = [];

  for (const roleName of ROLE_NAMES) {
    const roleId = roleMap.get(roleName);
    const permissionIds = permissionIdsForRole(roleName, permissions);

    for (const permissionId of permissionIds) {
      rolePermissions.push({
        role_id: roleId,
        permission_id: permissionId,
        created_at: now,
      });
    }
  }

  return rolePermissions;
}

async function filterMissingRolePermissionRows(queryInterface, rolePermissions) {
  const roleIds = [...new Set(rolePermissions.map((row) => row.role_id))];
  const permissionIds = [...new Set(rolePermissions.map((row) => row.permission_id))];

  if (roleIds.length === 0 || permissionIds.length === 0) {
    return [];
  }

  const existingRows = await queryInterface.sequelize.query(
    'SELECT role_id, permission_id FROM role_permissions WHERE role_id IN (:roleIds) AND permission_id IN (:permissionIds)',
    {
      replacements: { roleIds, permissionIds },
      type: QueryTypes.SELECT,
    },
  );

  const existingPairKeys = new Set(
    existingRows.map((row) => `${row.role_id}:${row.permission_id}`),
  );

  return rolePermissions.filter(
    (row) => !existingPairKeys.has(`${row.role_id}:${row.permission_id}`),
  );
}

module.exports = {
  async up(queryInterface) {
    const rolePermissions = await buildRolePermissionRows(queryInterface);

    if (rolePermissions.length === 0) {
      return;
    }

    const missingRolePermissions = await filterMissingRolePermissionRows(
      queryInterface,
      rolePermissions,
    );

    if (missingRolePermissions.length === 0) {
      return;
    }

    await queryInterface.bulkInsert('role_permissions', missingRolePermissions);
  },

  async down(queryInterface) {
    const rolePermissions = await buildRolePermissionRows(queryInterface);

    if (rolePermissions.length === 0) {
      return;
    }

    await queryInterface.bulkDelete('role_permissions', {
      [Op.or]: rolePermissions.map((rolePermission) => ({
        role_id: rolePermission.role_id,
        permission_id: rolePermission.permission_id,
      })),
    });
  },
};