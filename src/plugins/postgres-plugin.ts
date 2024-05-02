import "reflect-metadata"
import fp from 'fastify-plugin'
import { DataSource } from 'typeorm'
import User from "../db/entities/User"
import Team from "../db/entities/Team"
import Role from "../db/entities/Role"
import Project from "../db/entities/Project"
import Task from "../db/entities/Task"

const postgresPlugin = fp(async (fastify) => {
  const datasource = new DataSource({
    type: "postgres",
    host: fastify.config.POSTGRES_HOST,
    port: fastify.config.POSTGRES_PORT,
    username: fastify.config.POSTGRES_USER,
    password: fastify.config.POSTGRES_PASSWORD,
    database: fastify.config.POSTGRES_DATABASE,
    ssl: fastify.config.POSTGRES_SSL_REQUIRED,
    synchronize: false, // TODO: update to only on dev mode
    logging: false,
    entities: [User, Team, Project, Task, Role],
    migrations: [],
    subscribers: [],
  })

  await datasource.initialize()
  console.log('Database successfully initialized')

  fastify.decorate('db', datasource)
})

export default postgresPlugin