import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto } from "../types/lp";
import type { CommonResponse } from "../types/common";
import { axiosInstance } from "./axios";

/* LP 목록 */
export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

/* LP 상세 */
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

/* LP 좋아요 */
export const likeLp = async (
  lpId: number
) => {
  const response = await axiosInstance.post(
    `/v1/lps/${lpId}/likes`
  );

  return response.data;
};

/* LP 생성 */
export const createLp = async (
  formData: FormData
) => {
  const response =
    await axiosInstance.post(
      "/v1/lps",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};