import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import Team from "./Team"
import Role from "./Role"

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @ManyToOne(() => Team, (team) => team.members)
    @JoinColumn({ name: "team_id" })
    team: Team

    @ManyToOne(() => Role)
    @JoinColumn({ name: "role" })
    role: Role
}
