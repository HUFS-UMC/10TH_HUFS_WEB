import { api } from "./axios";
import type { PaginationDto } from "../types/common";
import type { ResponseLpDetailDto, ResponseLpListDto, ResponseCommentListDto, CreatePayload, CreateCommentPayload } from "../types/lp";

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
export const getLpComments = async (
  lpId: string,
  paginationDto: PaginationDto
) => {
  const { data } = await api.get<ResponseCommentListDto>(
    `/lps/${lpId}/comments`,
    {
      params: paginationDto,
    }
  );

  return data;
};



//댓글 api 함수.
export const createLp = async(payload: CreatePayload )=>{
  const {data} = await api.post("/lps", payload);

  return data;
}

export const createLpComment = async (
  lpId: string,
  payload: {content: string}
)=>{
  const {data} = await api.post(`/lps/${lpId}/comments`, payload);
  return data;
};

export const updateLpComment = async (
  lpId: string,
  commentId: number,
  payload: CreateCommentPayload
)=>{
  const {data} = await api.patch(
    `/lps/${lpId}/comments/${commentId}`);
    return data;
};

export const deleteLpComment = async (
  lpId: string,
  commentId : number
)=>{
  const {data} = await api.delete(`/lps/${lpId}/comments/${commentId}`);
  return data;
};

export const likeLp = async (lpId: string) => {
  const { data } = await api.post(`/lps/${lpId}/likes`);

  return data;
};

export const unlikeLp = async (lpId: string) => {
  const { data } = await api.delete(`/lps/${lpId}/likes`);

  return data;
};

// 검색
type SearchLpListParams = PaginationDto & {
  search: string;
  cursor: number | null;
};

export const getSearchLpList = async ({
  search,
  cursor,
  limit = 10,
  order = "desc",
}: SearchLpListParams) => {
  const { data } = await api.get<ResponseLpListDto>("/lps", {
    params: {
      search,
      cursor,
      limit,
      order,
    },
  });

  return data;
};