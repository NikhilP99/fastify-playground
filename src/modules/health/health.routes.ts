import { FastifyInstance } from "fastify"

const healthRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', (request, reply) => {
    return reply.status(200).send('OK')
  })
}

export default healthRoutes