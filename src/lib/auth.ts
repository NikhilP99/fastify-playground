import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import Permission from "../db/entities/Permission";

export type TokenData = {
  issuer: string;
  user: string;
  role: string;
}

export const createJwt = (app: FastifyInstance, data: TokenData) => {
  return app.jwt.sign(data, {
    expiresIn: '1d',
  })
}

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
}

export const authorizeWithPermission = (requiredPermission: string) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const payload: any = request.user
    const role = await request.server.roleService.findRole(payload.role)

    if(!role){
      return reply.status(403).send(`Invalid role`)
    }

    const permissions: Permission[] = role.permissions

    for(let i=0; i < permissions.length; i++){
      let permission = permissions[i]
      if(permission.permission === requiredPermission){
        return
      }
    }

    return reply.status(403).send(`Unauthorized to access requested resource`)
  }
}