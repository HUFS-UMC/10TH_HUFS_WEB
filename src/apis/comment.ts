import { axiosInstance } from "./axios.ts";
import type { PaginationDto } from "../types/common.ts";
import type {
  RequestCreateCommentDto,
  RequestDeleteCommentDto,
  RequestUpdateCommentDto,
  ResponseCreateCommentDto,
  ResponseDeleteCommentDto,
  ResponseLpCommentListDto,
  ResponseUpdateCommentDto,
} from "../types/comment.ts";

export const getLpComments = async (
  lpId: string,
  paginationDto: PaginationDto,
): Promise<ResponseLpCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: paginationDto,
  });

  return data;
};

export const postComment = async ({
  lpId,
  content,
}: RequestCreateCommentDto): Promise<ResponseCreateCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });

  return data;
};

export const updateComment = async ({
  lpId,
  commentId,
  content,
}: RequestUpdateCommentDto): Promise<ResponseUpdateCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    {
      content,
    },
  );

  return data;
};

export const deleteComment = async ({
  lpId,
  commentId,
}: RequestDeleteCommentDto): Promise<ResponseDeleteCommentDto> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`,
  );

  return data;
};