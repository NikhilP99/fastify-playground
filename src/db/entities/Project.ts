import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Team from "./Team";
import User from "./User"
import Task from "./Task";

@Entity()
export default class Project {

  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  timeline: Date;

  @OneToOne(() => User)
  @JoinColumn({name: "created_by"})
  created_by: User

  @ManyToMany(() => Team, (team) => team.projects)
  teams: Team[]

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[]
}