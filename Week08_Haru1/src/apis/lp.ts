import type { PaginationDto, CommonResponse, CursorBasedResponse } from "../types/common";
import type { ResponseLpListDto, Lp } from "../types/lp";
import { axiosInstance } from "./axios";

// ── LP 목록 (기존 코드 유지) ──
export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get("/v1/lps", {
        params: paginationDto,
    });
    return data;
};

// ── LP 상세 ──
export const getLpDetail = async (lpId: number): Promise<CommonResponse<Lp>> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
    return data;
};

// ── LP 생성 ──
export const postLp = async (body: {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
}): Promise<CommonResponse<Lp>> => {
    const { data } = await axiosInstance.post("/v1/lps", body);
    return data;
};

// ── 좋아요 등록 ──
export const postLikeLp = async (lpId: number): Promise<CommonResponse<{ id: number }>> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
    return data;
};

// ── 좋아요 취소 ──
export const deleteLikeLp = async (lpId: number): Promise<CommonResponse<null>> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
    return data;
};

// ── LP 삭제 ──
export const deleteLp = async (lpId: number): Promise<CommonResponse<null>> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
    return data;
};

// ── LP 수정 ──
export const patchLp = async (
    lpId: number,
    body: { title?: string; content?: string; thumbnail?: string; tags?: string[] }
): Promise<CommonResponse<Lp>> => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, body);
    return data;
};

// ── 댓글 목록 가져오기 ──
export const getComments = async (
    lpId: number, 
    paginationDto: PaginationDto
): Promise<CursorBasedResponse<Comment[]>> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
        params: paginationDto,
    });
    return data;
};

// ── 댓글 등록하기 ──
export const postComment = async (
    lpId: number, 
    content: string
): Promise<CommonResponse<Comment>> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
    return data;
};

// ── 댓글 수정 ──
export const patchComment = async (
    lpId: number,
    commentId: number,
    content: string
): Promise<CommonResponse<Comment>> => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });
    return data;
};

// ── 댓글 삭제 ──
export const deleteComment = async (
    lpId: number,
    commentId: number
): Promise<CommonResponse<null>> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
    return data;
};