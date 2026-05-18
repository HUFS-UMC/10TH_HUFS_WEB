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

/* 댓글 작성 */

interface PostCommentParams {
  lpId: number;
  content: string;
}

export const postComment = async ({
  lpId,
  content,
}: PostCommentParams) => {
  const response = await axiosInstance.post(
    `/v1/lps/${lpId}/comments`,
    {
      content,
    }
  );

  return response.data;
};

/* 댓글 삭제 */

export const deleteComment = async (
  commentId: number
) => {
  const response = await axiosInstance.delete(
    `/v1/comments/${commentId}`
  );

  return response.data;
};

/* 댓글 수정 */

export const updateComment = async (
  commentId: number,
  content: string
) => {
  const response = await axiosInstance.patch(
    `/v1/comments/${commentId}`,
    {
      content,
    }
  );

  return response.data;
};