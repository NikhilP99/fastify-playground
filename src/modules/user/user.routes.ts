import { FastifyInstance, RouteGenericInterface } from "fastify";
import { IUserGetParams, IUserGetRequestParamsSchema, IUserGetResponseBody, IUserGetResponseSchema, IUserLoginRequestBody, IUserLoginRequestSchema, IUserLoginResponseBody, IUserLoginResponseSchema, IUserRegisterRequestBody, IUserRegisterRequestSchema, IUserRegisterResponseBody, IUserRegisterResponseSchema, IUserUpdateRequestBody, IUserUpdateRequestSchema, IUserUpdateResponseBody, IUserUpdateResponseSchema, IUserUpdateRoleRequestBody, IUserUpdateRoleRequestSchema, IUserUpdateRoleResponseBody, IUserUpdateRoleResponseSchema } from "./user.schema";
import { getUser, loginUser, registerUser, updateUserData, updateUserRole } from "./user.controller";
import { PERMISSION } from "../../enums/permissions";

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

  app.get<UserGetRequest>('/v1/:email', {
    schema: {
      params: IUserGetRequestParamsSchema,
      response: {
        200: IUserGetResponseSchema
      }
    },
    onRequest: [app.authenticate],
    preHandler: [app.authorizeWithPermission(PERMISSION.USER_GET)],
    handler: async (request, reply) => {
      const { email } = request.params
      const registerResponse = await getUser(app, email);
      return reply.status(200).send(registerResponse);
    },
  });

  app.put<UserUpdateRequest>('/v1/update', {
    schema: {
      body: IUserUpdateRequestSchema,
      response: {
        200: IUserUpdateResponseSchema
      }
    },
    onRequest: [app.authenticate],
    preHandler: [app.authorizeWithPermission(PERMISSION.USER_UPDATE)],
    handler: async (request, reply) => {
      const payload: any = request.user
      const registerResponse = await updateUserData(app, payload.user, request.body);
      return reply.status(200).send(registerResponse);
    },
  });

  app.put<UserUpdateRoleRequest>('/v1/update/role', {
    schema: {
      body: IUserUpdateRoleRequestSchema,
      response: {
        200: IUserUpdateRoleResponseSchema
      }
    },
    onRequest: [app.authenticate],
    preHandler: [app.authorizeWithPermission(PERMISSION.USER_ROLE_UPDATE)],
    handler: async (request, reply) => {
      const registerResponse = await updateUserRole(app, request.body);
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

interface UserGetRequest extends RouteGenericInterface {
  Params: IUserGetParams
  Reply: IUserGetResponseBody
}

interface UserUpdateRequest extends RouteGenericInterface {
  Body: IUserUpdateRequestBody
  Reply: IUserUpdateResponseBody
}

interface UserUpdateRoleRequest extends RouteGenericInterface {
  Body: IUserUpdateRoleRequestBody
  Reply: IUserUpdateRoleResponseBody
}
export default userRoutes;