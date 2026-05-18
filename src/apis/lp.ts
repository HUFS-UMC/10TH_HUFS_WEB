import type { PaginationDto } from "../types/common.ts";
import type {
  RequestCreateLpDto,
  RequestDeleteLpDto,
  RequestLpDto,
  RequestUpdateLpDto,
  ResponseCreateLpDto,
  ResponseDeleteLpDto,
  ResponseLikeDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
  ResponseUpdateLpDto,
} from "../types/lp.ts";
import { axiosInstance } from "./axios.ts";

export const getLpList = async (
  paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (
  lpId: string,
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};

export const postLp = async (
  body: RequestCreateLpDto,
): Promise<ResponseCreateLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", body);

  return data;
};

export const updateLp = async ({
  lpId,
  title,
  content,
  thumbnail,
  tags,
  published = true,
}: RequestUpdateLpDto): Promise<ResponseUpdateLpDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, {
    title,
    content,
    thumbnail,
    tags,
    published,
  });

  return data;
};

export const deleteLp = async ({
  lpId,
}: RequestDeleteLpDto): Promise<ResponseDeleteLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);

  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
};