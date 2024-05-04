import { FastifyInstance } from "fastify";
import { IUserGetResponseBody, IUserLoginRequestBody, IUserLoginResponseBody, IUserRegisterRequestBody, IUserRegisterResponseBody, IUserUpdateRequestBody, IUserUpdateResponseBody, IUserUpdateRoleRequestBody, IUserUpdateRoleResponseBody } from "./user.schema";
import User from "../../db/entities/User";
import { InvalidRequestError, UnauthorizedRequestError } from "../../errors/errors";
import Role from "../../db/entities/Role";

export const registerUser = async (app: FastifyInstance, user: IUserRegisterRequestBody) : Promise<IUserRegisterResponseBody> => {
  const userExists: boolean = await app.userService.userExists(user.email)
  if(userExists){
    throw new InvalidRequestError(`User - ${user.email} already exists.`)    
  }

  const userEntity = new User()
  userEntity.email = user.email.trim().toLowerCase()
  userEntity.password = user.password  // TODO: encrypt password
  userEntity.first_name = user.firstName
  userEntity.last_name = user.lastName

  const savedUser = await app.userService.saveUser(userEntity)
  return {
    success: true,
    message: `User ${savedUser.email} successfully registered!`
  }
}

export const loginUser = async (app: FastifyInstance, loginRequest: IUserLoginRequestBody): Promise<IUserLoginResponseBody> => {
  const user: User = await getUserFromEmail(app, loginRequest.email)

  // TODO: encrypted check
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

export const getUser = async (app: FastifyInstance, email: string): Promise<IUserGetResponseBody> => {
  const user: User = await getUserFromEmail(app, email);

  return {
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role?.name,
  };
}

export const updateUserData = async (app: FastifyInstance, updateRequest: IUserUpdateRequestBody): Promise<IUserUpdateResponseBody> => {
  const user: User = await getUserFromEmail(app, updateRequest.email)

  if(updateRequest.firstName){
    user.first_name = updateRequest.firstName.trim()
  }

  if(updateRequest.lastName){
    user.last_name = updateRequest.lastName.trim()
  }

  if(updateRequest.password){
    user.password = updateRequest.password.trim()
  }

  const updatedUser: User = await app.userService.saveUser(user)

  return {
    success: true,
    message: `User ${updatedUser.email} successfully updated!`
  }
}

export const updateUserRole = async (app: FastifyInstance, updateRoleRequest: IUserUpdateRoleRequestBody): Promise<IUserUpdateRoleResponseBody> => {
  const user: User = await getUserFromEmail(app, updateRoleRequest.email)
  const role: Role = await saveRoleIfNotExists(app, updateRoleRequest.role.trim())

  user.role = role;
  await app.userService.saveUser(user)

  return {
    success: true,
    message: `User ${user.email}'s role is now ${role.name}!`
  }
}


const getUserFromEmail = async (app: FastifyInstance, email: string) => {
  const sanitizedEmail = email.trim().toLowerCase();
  const user = await app.userService.getUserByEmail(sanitizedEmail);
  if(!user){
    throw new InvalidRequestError(`User - ${sanitizedEmail} doesn't exist.`)    
  }
  return user;
}

const saveRoleIfNotExists = async (app: FastifyInstance, roleName: string) : Promise<Role> => {
  let role = await app.roleService.findRole(roleName)
  if(!role){
    role = new Role();
    role.name = roleName;
  
    role = await app.roleService.saveRole(role);
  }
  return role;
}