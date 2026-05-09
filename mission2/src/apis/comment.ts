import { axiosInstance } from "./axios";

interface GetCommentsParams {
  lpId: number;
  cursor?: number;
  limit?: number;
  order: "asc" | "desc";
}

export const getComments = async ({
  lpId,
  cursor = 0,
  limit = 10,
  order,
}: GetCommentsParams) => {
  const response = await axiosInstance.get(
    `/v1/lps/${lpId}/comments`,
    {
      params: {
        cursor,
        limit,
        order,
      },
    }
  );

  return response.data;
};