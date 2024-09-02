import { PERMISSION } from "../enums/permissions";

const roles_permissions: Record<string, PERMISSION[]> = {
  ADMIN: [
    PERMISSION.USER_GET,
    PERMISSION.USER_UPDATE,
    PERMISSION.USER_ROLE_UPDATE
  ],
  MANAGER: [
    PERMISSION.USER_GET,
    PERMISSION.USER_UPDATE,
    PERMISSION.USER_ROLE_UPDATE
  ],
  TEAM_LEAD: [
    PERMISSION.USER_GET,
    PERMISSION.USER_UPDATE
  ],
  DEVELOPER: [
    PERMISSION.USER_GET,
    PERMISSION.USER_UPDATE,
  ]
}

export default roles_permissions