import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto } from "../types/lp";
import type { CommonResponse } from "../types/common";
import { axiosInstance } from "./axios";

/* ----------------------------
  LP 목록
---------------------------- */
export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

/* ----------------------------
  LP 상세
---------------------------- */
export type ResponseLpDetailDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}>;

export const getLpDetail = async (
  lpid: number
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};