import { FastifyInstance } from "fastify";
import { ROLE } from "../enums/roles";
import { PERMISSION } from "../enums/permissions";
import Role from "../db/entities/Role";
import Permission from "../db/entities/Permission";

const roles_permissions: Record<string, PERMISSION[]> = {
  ADMIN: [PERMISSION.USER_ROLE_UPDATE],
  MANAGER: [PERMISSION.USER_ROLE_UPDATE],
  TEAM_LEAD: [],
  DEVELOPER: []
}

export const initRoles = async (app: FastifyInstance) => {
  Object.keys(ROLE).forEach(async (roleName: string) => {
    const permissions = roles_permissions[roleName]
    
    const role: Role = await app.roleService.saveIfNotExists(roleName);
    const permissionList: Permission[] = await Promise.all(
      permissions.map(async (permission: string) => {
        return await app.permissionService.saveIfNotExists(permission)
      })
    )
    
    role.permissions = permissionList;
    await app.roleService.saveRole(role)
  })
}