import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import User from "./User"
import Project from "./Project"

@Entity()
export default class Team {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    created_by: string

    @OneToOne(() => User)
    @JoinColumn({name: "team_lead"})
    team_lead: User

    @OneToMany(() => User, (user) => user.team)
    members: User[]

    @ManyToMany(() => Project, (project) => project.teams)
    @JoinTable()
    projects: Project[]

}
