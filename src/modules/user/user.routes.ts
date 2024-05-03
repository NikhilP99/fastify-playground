import { FastifyInstance, RouteGenericInterface } from "fastify";
import { IUserLoginRequestBody, IUserLoginRequestSchema, IUserLoginResponseBody, IUserLoginResponseSchema, IUserRegisterRequestBody, IUserRegisterRequestSchema, IUserRegisterResponseBody, IUserRegisterResponseSchema } from "./user.schema";
import { loginUser, registerUser } from "./user.controller";

const userRoutes = async (app: FastifyInstance) => {

  app.post<UserLoginRequest>('/v1/login', {
    schema: {
      body: IUserLoginRequestSchema,
      response: {
        200: IUserLoginResponseSchema
      }
    },
    handler: async (request, reply) => {
      const loginResponse = await loginUser(app, request.body);
      return reply.status(200).send(loginResponse);
    },
  });

  app.post<UserRegisterRequest>('/v1/register', {
    schema: {
      body: IUserRegisterRequestSchema,
      response: {
        200: IUserRegisterResponseSchema
      }
    },
    handler: async (request, reply) => {
      const registerResponse = await registerUser(app, request.body);
      return reply.status(200).send(registerResponse);
    },
  });

}

interface UserLoginRequest extends RouteGenericInterface {
  Body: IUserLoginRequestBody
  Reply: IUserLoginResponseBody
}

interface UserRegisterRequest extends RouteGenericInterface {
  Body: IUserRegisterRequestBody
  Reply: IUserRegisterResponseBody
}

export default userRoutes;