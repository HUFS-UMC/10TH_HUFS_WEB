import type { CommonResponse } from "./common.ts";

export type ResponseUploadDto = CommonResponse<{
  imageUrl: string;
}>;