import { FastifyInstance } from "fastify";
import { IUserLoginRequestBody, IUserRegisterRequestBody } from "./user.schema";
import User from "../../db/entities/User";
import { InvalidRequestError, UnauthorizedRequestError } from "../../errors/errors";

export const registerUser = async (app: FastifyInstance, user: IUserRegisterRequestBody) => {
  const userExists: boolean = await app.userService.userExists(user.email)
  if(userExists){
    throw new InvalidRequestError(`User - ${user.email} already exists.`)    
  }

  const userEntity = new User()
  userEntity.email = user.email.trim().toLowerCase()
  userEntity.password = user.password
  userEntity.first_name = user.firstName
  userEntity.last_name = user.lastName

  return await app.userService.saveUser(userEntity)
}

export const loginUser = async (app: FastifyInstance, loginRequest: IUserLoginRequestBody) => {
  const email = loginRequest.email.trim().toLowerCase();
  const user = await app.userService.getUserByEmail(email);
  if(!user){
    throw new InvalidRequestError(`User - ${email} doesn't exist.`)    
  }

  if(user.password !== loginRequest.password){
    throw new UnauthorizedRequestError(`Incorrect email or password`)
  }

  return user;
}