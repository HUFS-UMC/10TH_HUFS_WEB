import type { CursorBasedResponse } from "./common.ts";

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

export type ResponseLpCommentListDto = CursorBasedResponse<LpComment[]>;