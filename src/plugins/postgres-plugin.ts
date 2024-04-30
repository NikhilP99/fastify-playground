import "reflect-metadata"
import fp from 'fastify-plugin'
import { DataSource } from 'typeorm'
import { User } from "../db/entities/User"

const postgresPlugin = fp(async (fastify) => {
  const datasource = new DataSource({
    type: "postgres",
    host: fastify.config.POSTGRES_HOST,
    port: fastify.config.POSTGRES_PORT,
    username: fastify.config.POSTGRES_USER,
    password: fastify.config.POSTGRES_PASSWORD,
    database: fastify.config.POSTGRES_DATABASE,
    synchronize: true, // TODO: update to only on dev mode
    logging: false,
    entities: [User],
    ssl: false,
    migrations: [],
    subscribers: [],
  })

  await datasource.initialize()
  console.log('Database successfully initialized')

  fastify.decorate('db', datasource)
})

export default postgresPlugin