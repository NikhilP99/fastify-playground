import { z } from 'zod'
import { zodToJsonSchema } from "zod-to-json-schema";

const UserLoginRequest = z.object({
  email: z.string().email(),
  password: z.string()
});

const UserRegisterRequest = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
});


// JSON Schema
export const IUserLoginRequestSchema = zodToJsonSchema(UserLoginRequest, "IUserLoginRequestSchema")
export const IUserRegisterRequestSchema = zodToJsonSchema(UserRegisterRequest, "IUserRegisterRequestSchema")


// Types
export type IUserLoginRequestBody = z.infer<typeof UserLoginRequest>;
export type IUserRegisterRequestBody = z.infer<typeof UserRegisterRequest>;