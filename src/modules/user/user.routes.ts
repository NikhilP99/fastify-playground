import { FastifyInstance, RouteGenericInterface } from "fastify";
import { IUserLoginRequestBody, IUserLoginRequestSchema, IUserRegisterRequestBody, IUserRegisterRequestSchema } from "./user.schema";
import { loginUser, registerUser } from "./user.controller";

const userRoutes = async (app: FastifyInstance) => {

  app.post<UserLoginRequest>('/v1/login', {
    schema: {
      body: IUserLoginRequestSchema
    },
    handler: async (request, reply) => {
      const loginResponse = loginUser(app, request.body);
      return reply.status(200).send(loginResponse);
    },
  });

  app.post<UserRegisterRequest>('/v1/register', {
    schema: {
      body: IUserRegisterRequestSchema
    },
    handler: async (request, reply) => {
      const registerResponse = await registerUser(app, request.body);
      return reply.status(200).send(registerResponse);
    },
  });

}

interface UserLoginRequest extends RouteGenericInterface {
  Body: IUserLoginRequestBody
}

interface UserRegisterRequest extends RouteGenericInterface {
  Body: IUserRegisterRequestBody
}

export default userRoutes;