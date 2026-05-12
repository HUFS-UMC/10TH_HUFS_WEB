import { api } from "./axios";

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?:string;
}

export const signinApi = async (data: SigninRequest) => {
  const response = await api.post("/auth/signin", data);
  return response.data;
};

export const signupApi = async (data: SignupRequest) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};
export const getProtectedApi = async () => {
  const response = await api.get("/auth/protected");
  return response.data;
};