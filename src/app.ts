import fastify, { FastifyInstance } from 'fastify'
import fastifyEnvPlugin, { EnvConfig } from './plugins/fastify-env'
import healthRoutes from './modules/health/health.routes';

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvConfig;
  }
}

const buildApp = async (): Promise<FastifyInstance> => {
  const app = fastify()

  // Load environment variables first
  await app.register(fastifyEnvPlugin)

  // Register DB

  // Register services

  // Register routes
  app.register(healthRoutes, { prefix: '/health' })

  return app
}

export default buildApp