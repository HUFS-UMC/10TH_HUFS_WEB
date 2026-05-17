import type { commonResponseDto } from "./common";

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type ResponseCommentListDto = commonResponseDto<{
  data: Comment[];
  nextCursor: number;
  hasNext: boolean;
}>;

export type ResponseCommentDto = commonResponseDto<Comment>;

export type RequestCreateCommentDto = {
  lpId: number;
  content: string;
};

export type RequestUpdateCommentDto = {
  lpId: number;
  commentId: number;
  content: string;
};

export type RequestDeleteCommentDto = {
  lpId: number;
  commentId: number;
};
