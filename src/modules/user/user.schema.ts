import { z } from 'zod'
import { zodToJsonSchema } from "zod-to-json-schema";

const UserLoginRequest = z.object({
  email: z.string().email(),
  password: z.string()
});

const UserLoginResponse = z.object({
  success: z.boolean(),
  accessToken: z.string(),
  expiresIn: z.string()
});

const UserRegisterRequest = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const UserRegisterResponse = z.object({
  success: z.boolean(),
  message: z.string()
});

const UserGetRequest = z.object({
  email: z.string().email()
});

const UserGetResponse = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.optional(z.string())
});

const UserUpdateRequest = z.object({
  email: z.string().email(),
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
  password: z.optional(z.string()),
});

const UserUpdateResponse = z.object({
  success: z.boolean(),
  message: z.string()
});

const UserUpdateRoleRequest = z.object({
  email: z.string().email(),
  role: z.string()
});

const UserUpdateRoleResponse = z.object({
  success: z.boolean(),
  message: z.string()
});

// JSON Schema
export const IUserLoginRequestSchema = zodToJsonSchema(UserLoginRequest, "IUserLoginRequestSchema")
export const IUserLoginResponseSchema = zodToJsonSchema(UserLoginResponse, "IUserLoginResponseSchema")
export const IUserRegisterRequestSchema = zodToJsonSchema(UserRegisterRequest, "IUserRegisterRequestSchema")
export const IUserRegisterResponseSchema = zodToJsonSchema(UserRegisterResponse, "IUserRegisterResponseSchema")
export const IUserGetRequestParamsSchema = zodToJsonSchema(UserGetRequest, "IUserGetRequestSchema")
export const IUserGetResponseSchema = zodToJsonSchema(UserGetResponse, "IUserGetResponseSchema")
export const IUserUpdateRequestSchema = zodToJsonSchema(UserUpdateRequest, "IUserUpdateRequestSchema")
export const IUserUpdateResponseSchema = zodToJsonSchema(UserUpdateResponse, "IUserUpdateResponseSchema")
export const IUserUpdateRoleRequestSchema = zodToJsonSchema(UserUpdateRoleRequest, "IUserUpdateRoleRequestSchema")
export const IUserUpdateRoleResponseSchema = zodToJsonSchema(UserUpdateRoleResponse, "IUserUpdateRoleResponseSchema")


// Types
export type IUserLoginRequestBody = z.infer<typeof UserLoginRequest>;
export type IUserLoginResponseBody = z.infer<typeof UserLoginResponse>;
export type IUserRegisterRequestBody = z.infer<typeof UserRegisterRequest>;
export type IUserRegisterResponseBody = z.infer<typeof UserRegisterResponse>;
export type IUserGetParams = z.infer<typeof UserGetRequest>;
export type IUserGetResponseBody = z.infer<typeof UserGetResponse>;
export type IUserUpdateRequestBody = z.infer<typeof UserUpdateRequest>;
export type IUserUpdateResponseBody = z.infer<typeof UserUpdateResponse>;
export type IUserUpdateRoleRequestBody = z.infer<typeof UserUpdateRoleRequest>;
export type IUserUpdateRoleResponseBody = z.infer<typeof UserUpdateRoleResponse>;
