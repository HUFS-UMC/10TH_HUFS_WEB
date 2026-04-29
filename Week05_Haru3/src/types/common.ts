export type CommonResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
};

export type CursorBasedResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
    newCursor: number;
    hasNext: boolean;
};

enum PAGINATIONORDER {
    "asc" = 'asc',
    "desc" = 'desc',
}

export type PaginationDto = {
    cursor?: number;
    limit?: number;
    search?: number;
    order?: PAGINATIONORDER
}