export type CommonResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data:T;
};

export type CursorBasedResponse<T> = {
  data: T;
  nextCursor: number;
  hasNext: boolean;
};

export type PaginationOrder = "asc" | "desc";

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PaginationOrder;
};

