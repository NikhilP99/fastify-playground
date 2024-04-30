import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'

export interface EnvConfig {
  PORT: number
  POSTGRES_HOST: string
  POSTGRES_PORT: number
  POSTGRES_USER: string
  POSTGRES_PASSWORD: string
  POSTGRES_DATABASE: string
}

const fastifyEnvPlugin = fp(async (fastify) => {
  const schema = {
    type: 'object',
    properties: {
      PORT: {
        type: 'integer',
        default: 8080
      },
      POSTGRES_HOST: {
        type: 'string',
        default: 'localhost'
      },
      POSTGRES_PORT: {
        type: 'integer',
        default: 5432
      },
      POSTGRES_USER: {
        type: 'string',
        default: 'playground_user'
      },
      POSTGRES_PASSWORD: {
        type: 'string',
        default: 'playground_user'
      },
      POSTGRES_DATABASE: {
        type: 'string',
        default: 'playground'
      },
    },
    required: ['PORT', 'POSTGRES_HOST', 'POSTGRES_PORT', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DATABASE']
  }
  
  const options = {
    confKey: "config",
    schema,
    dotenv: {
      path: `.env`
    },
    data: process.env
  }

  await fastify.register(fastifyEnv, options)
})

export default fastifyEnvPlugin