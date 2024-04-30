import fastify, { FastifyInstance } from 'fastify'
import { DataSource } from 'typeorm';

import fastifyEnvPlugin, { EnvConfig } from './plugins/fastify-env'
import postgresPlugin from './plugins/postgres-plugin';

import healthRoutes from './modules/health/health.routes';

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvConfig;
    db: DataSource
  }
}

const buildApp = async (): Promise<FastifyInstance> => {
  const app = fastify()

  // Load environment variables first
  await app.register(fastifyEnvPlugin)

  // Register DB
  await app.register(postgresPlugin)

  // Register services

  // Register routes
  app.register(healthRoutes, { prefix: '/health' })

  return app
}

export default buildApp