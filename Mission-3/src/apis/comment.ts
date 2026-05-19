import type {
  RequestCreateCommentDto,
  RequestDeleteCommentDto,
  RequestUpdateCommentDto,
  ResponseCommentDto,
  ResponseCommentListDto,
} from "../types/comment";
import { axiosInstance } from "./axios";

export const getComments = async ({
  lpId,
  cursor,
  limit = 10,
  order = "desc",
}: {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: "asc" | "desc";
}): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });
  return data;
};

export const createComment = async ({
  lpId,
  content,
}: RequestCreateCommentDto): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return data;
};

export const updateComment = async ({
  lpId,
  commentId,
  content,
}: RequestUpdateCommentDto): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content },
  );
  return data;
};

export const deleteComment = async ({
  lpId,
  commentId,
}: RequestDeleteCommentDto): Promise<void> => {
  await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
};
