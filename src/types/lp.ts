import type { CommonResponse, CursorBasedResponse } from "./common.ts";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt?: string;
  updatedAt?: string;
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
  likes: Likes[];
};

export type LpDetail = Lp & {
  author?: Author;
};

export type RequestLpDto = {
  lpId: number;
};

export type RequestCreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published?: boolean;
};

export type RequestUpdateLpDto = {
  lpId: number;
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published?: boolean;
};

export type RequestDeleteLpDto = {
  lpId: number;
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLpDetailDto = CommonResponse<LpDetail>;

export type ResponseCreateLpDto = CommonResponse<Lp>;

export type ResponseUpdateLpDto = CommonResponse<LpDetail>;

export type ResponseLikeDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type ResponseDeleteLpDto = CommonResponse<{
  id: number;
}>;