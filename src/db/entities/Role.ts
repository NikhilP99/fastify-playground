import { Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm"
import Permission from "./Permission"

@Entity()
export default class Role {

    @PrimaryColumn()
    name: string

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable()
    permissions: Permission[]
}
