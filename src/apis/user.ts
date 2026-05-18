import { axiosInstance } from "./axios.ts";
import type {
  RequestUpdateMyInfoDto,
  ResponseDeleteUserDto,
  ResponseUpdateMyInfoDto,
} from "../types/user.ts";

export const patchMyInfo = async (
  body: RequestUpdateMyInfoDto,
): Promise<ResponseUpdateMyInfoDto> => {
  const { data } = await axiosInstance.patch("/v1/users", body);

  return data;
};

export const deleteUser = async (): Promise<ResponseDeleteUserDto> => {
  const { data } = await axiosInstance.delete("/v1/users");

  return data;
};