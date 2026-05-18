import { api } from "./axios";

export type UpdateMyProfilePayload = {
  name: string;
  bio?: string | null;
  avatar?: string | null;
};

export const updateMyProfileApi = async (
  payload: UpdateMyProfilePayload
) => {
  const { data } = await api.patch("/users", payload);

  return data;
};