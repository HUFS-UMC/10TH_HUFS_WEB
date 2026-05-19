import { api } from "./axios";
import type { PaginationDto } from "../types/common";
import type { ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";

export const getLpList = async (paginationDto: PaginationDto) => {
  const { data } = await api.get<ResponseLpListDto>("/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (lpid: string) => {
  const { data } = await api.get<ResponseLpDetailDto>(`/lps/${lpid}`);

  return data;
};