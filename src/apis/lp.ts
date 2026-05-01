import type { PaginationDto, CommonResponse } from "../types/common";
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