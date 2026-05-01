import type { CursorBasedResponse } from "./common";

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
        nickname: string;
        profileImage?: string;
    };
};

export type ResponseLpListDto =CursorBasedResponse<Lp[]>;