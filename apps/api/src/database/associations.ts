import { User } from '../modules/user/user.model';
import { Role } from '../modules/role/role.model';
import { Permission } from '../modules/permission/permission.model';

import { UserRole } from '../modules/user-role/user-role.model';
import { RolePermission } from '../modules/role-permission/role-permission.model';
import { RefreshToken } from '../modules/refresh-token/refresh-token.model';

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: 'user_id',
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: 'role_id',
});

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'role_id',
});

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permission_id',
});

User.hasMany(RefreshToken, {
  foreignKey: 'user_id',
});

RefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
});
