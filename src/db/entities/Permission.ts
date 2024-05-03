import { Entity, ManyToMany, PrimaryColumn } from "typeorm";
import Role from "./Role";

@Entity()
export default class Permission {

  @PrimaryColumn()
  permission: string

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[]

}