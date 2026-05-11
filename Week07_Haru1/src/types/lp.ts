import type { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
};

export type Lp = {
    id: number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorid: number;
        createAt: Date;
        updatedAt: Date;
        tags: Tag[];
        likes: Likes[];
};

export type Comment = {
    id: number;
    content: string;
    userId: number;
    lpId: number;
    createAt: string;
    user: {
        name: string;
        profileImage?: string;
    };
};

export type RequestLpDto ={
    lpid: number;
};

export type ResponseLpDto = CommonResponse<Lp>;

export type ResponseLikeLpDto = CommonResponse<{
    id: number;
    userId: number;
    lpId: number;
}>;

export type ResponseLpListDto =CursorBasedResponse<Lp[]>;