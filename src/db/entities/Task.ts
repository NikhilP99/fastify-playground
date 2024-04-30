import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import Project from "./Project";

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  priority: string

  @Column()
  status: string

  @ManyToOne(() => User)
  @JoinColumn({ name: "assigned_to" })
  assigned_to: User

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: "project" })
  project: Project

}