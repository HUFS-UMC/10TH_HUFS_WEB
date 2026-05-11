export type CommonResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
};

export enum PAGINATIONORDER {
    "asc" = 'asc',
    "desc" = 'desc',
}

export type CursorBasedResponse<T> = CommonResponse<{
    data: T;
    nextCursor: number;
    hasNext: boolean;
}>;

export type PaginationDto = {
    cursor?: number;
    limit?: number;
    search?: string;
    order?: PAGINATIONORDER
}