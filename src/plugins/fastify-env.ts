import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'

export interface EnvConfig {
  PORT: number
}

const fastifyEnvPlugin = fp(async (fastify) => {
  const schema = {
    type: 'object',
    properties: {
      PORT: {
        type: 'integer',
        default: 8080
      }
    },
    required: ['PORT']
  }
  
  const options = {
    confKey: "config",
    schema,
    dotenv: {
      path: `${__dirname}/.env`
    },
    data: process.env
  }

  await fastify.register(fastifyEnv, options)
})

export default fastifyEnvPlugin