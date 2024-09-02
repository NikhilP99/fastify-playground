import { FastifyInstance } from "fastify";
import { ROLE } from "../enums/roles";
import roles_permissions from "../config/role-config";
import Role from "../db/entities/Role";
import Permission from "../db/entities/Permission";

export const initRoles = async (app: FastifyInstance) => {
  Object.keys(ROLE).forEach(async (roleName: string) => {
    const permissions = roles_permissions[roleName]
    
    if(permissions && permissions.length >= 0){
      
      const role: Role = await app.roleService.saveIfNotExists(roleName);
      const permissionList: Permission[] = await Promise.all(
        permissions.map(async (permission: string) => {
          return await app.permissionService.saveIfNotExists(permission)
        })
      )
      
      role.permissions = permissionList;
      await app.roleService.saveRole(role)
    }
  })
}