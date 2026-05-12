import { z } from "zod";
import { signupSchema } from "../utils/validate";

export type SignupFormValues = z.infer<typeof signupSchema>;

export interface User {
  email: string;
  nickname: string;
}