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


// JSON Schema
export const IUserLoginRequestSchema = zodToJsonSchema(UserLoginRequest, "IUserLoginRequestSchema")
export const IUserLoginResponseSchema = zodToJsonSchema(UserLoginResponse, "IUserLoginResponseSchema")
export const IUserRegisterRequestSchema = zodToJsonSchema(UserRegisterRequest, "IUserRegisterRequestSchema")
export const IUserRegisterResponseSchema = zodToJsonSchema(UserRegisterResponse, "IUserRegisterResponseSchema")


// Types
export type IUserLoginRequestBody = z.infer<typeof UserLoginRequest>;
export type IUserLoginResponseBody = z.infer<typeof UserLoginResponse>;
export type IUserRegisterRequestBody = z.infer<typeof UserRegisterRequest>;
export type IUserRegisterResponseBody = z.infer<typeof UserRegisterResponse>;