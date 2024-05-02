import { FastifyInstance } from "fastify";
import { IUserLoginRequestBody, IUserRegisterRequestBody } from "./user.schema";
import User from "../../db/entities/User";

export const registerUser = async (app: FastifyInstance, user: IUserRegisterRequestBody) => {
  const userEntity = new User()
  userEntity.email = user.email
  userEntity.password = user.password
  userEntity.first_name = user.firstName
  userEntity.last_name = user.lastName

  return await app.userService.saveUser(userEntity)
}

export const loginUser = (app: FastifyInstance, user: IUserLoginRequestBody) => {
  
}