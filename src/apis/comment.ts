import { axiosInstance } from "./axios.ts";
import type { PaginationDto } from "../types/common.ts";
import type { ResponseLpCommentListDto } from "../types/comment.ts";

export const getLpComments = async (
  lpId: string,
  paginationDto: PaginationDto,
): Promise<ResponseLpCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: paginationDto,
  });

  return data;
};