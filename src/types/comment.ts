import type { CommonResponse, CursorBasedResponse } from "./common.ts";

export type CommentAuthor = {
  id: number;
  name: string;
  email?: string;
  bio?: string | null;
  avatar?: string | null;
};

export type LpComment = {
  id: number;
  content: string;
  lpId: number;
  authorId?: number;
  userId?: number;
  createdAt: string;
  updatedAt: string;
  author?: CommentAuthor;
  user?: CommentAuthor;
};

export type RequestCreateCommentDto = {
  lpId: string;
  content: string;
};

export type RequestUpdateCommentDto = {
  lpId: string;
  commentId: number;
  content: string;
};

export type RequestDeleteCommentDto = {
  lpId: string;
  commentId: number;
};

export type ResponseLpCommentListDto = CursorBasedResponse<LpComment[]>;

export type ResponseCreateCommentDto = CommonResponse<LpComment>;

export type ResponseUpdateCommentDto = CommonResponse<LpComment>;

export type ResponseDeleteCommentDto = CommonResponse<{
  id: number;
}>;