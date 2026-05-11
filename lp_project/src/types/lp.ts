import type { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Like = {
  id: number;
  name: number;
  lpid: number;
};

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
  author?:Author;
};

export type LpComment = {
        id: number;
        content: string;
        lpId: number;
        authorId: number;
        createdAt: string;
        updatedAt: string;
        author: Author;
};
  export type CreatePayload = {
    title:string;
    content: string;
    tags: string[];
    thumbnail: string;
    published: boolean;
  }

  export type CreateCommentPayload = {
  content: string;
};

export type UpdateCommentPayload = {
  commentId: number;
  content: string;
};

export type ResponseLpListDto = CommonResponse<CursorBasedResponse<Lp[]>>;

export type ResponseLpDetailDto = CommonResponse<Lp>;

export type ResponseCommentListDto =
  CommonResponse<CursorBasedResponse<LpComment[]>>;

