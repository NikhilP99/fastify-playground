import { FastifyInstance } from "fastify";
import { IUserLoginRequestBody, IUserLoginResponseBody, IUserRegisterRequestBody, IUserRegisterResponseBody } from "./user.schema";
import User from "../../db/entities/User";
import { InvalidRequestError, UnauthorizedRequestError } from "../../errors/errors";

export const registerUser = async (app: FastifyInstance, user: IUserRegisterRequestBody) : Promise<IUserRegisterResponseBody> => {
  const userExists: boolean = await app.userService.userExists(user.email)
  if(userExists){
    throw new InvalidRequestError(`User - ${user.email} already exists.`)    
  }

  const userEntity = new User()
  userEntity.email = user.email.trim().toLowerCase()
  userEntity.password = user.password
  userEntity.first_name = user.firstName
  userEntity.last_name = user.lastName

  const savedUser = await app.userService.saveUser(userEntity)
  return {
    success: true,
    message: `User ${savedUser.email} successfully registered!`
  }
}

export const loginUser = async (app: FastifyInstance, loginRequest: IUserLoginRequestBody): Promise<IUserLoginResponseBody> => {
  const email = loginRequest.email.trim().toLowerCase();
  const user = await app.userService.getUserByEmail(email);
  if(!user){
    throw new InvalidRequestError(`User - ${email} doesn't exist.`)    
  }

  if(user.password !== loginRequest.password){
    throw new UnauthorizedRequestError(`Incorrect email or password`)
  }
  
  const accessToken = app.jwt.sign({
    issuer: 'playground',
    user: user.email,
    role: user.role
  },{
    expiresIn: '1d',
  })

  return {
    success: true,
    accessToken,
    expiresIn: '1d'
  };
}