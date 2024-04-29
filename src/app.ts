import fastify, { FastifyInstance } from 'fastify'
import fastifyEnvPlugin, { EnvConfig } from './plugins/fastify-env'

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvConfig;
  }
}

const buildApp = async (): Promise<FastifyInstance> => {
  const app = fastify()

  // Load environment variables first
  await app.register(fastifyEnvPlugin)

  // Register other plugins
  app.get('/ping', async (request, reply) => {
    reply.send("pong")
  })

  return app
}

export default buildApp