import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity()
export default class Role {

    @PrimaryColumn()
    name: string

}
