import type { CommonResponse } from "./common.ts";

export type User = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

export type RequestUpdateMyInfoDto = {
  name: string;
  bio: string;
  avatar: string;
};

export type ResponseUpdateMyInfoDto = CommonResponse<User>;

export type ResponseDeleteUserDto = CommonResponse<{
  id: number;
}>;