import { useMutation } from "@tanstack/react-query";

import { uploadImage } from "../../apis/upload.ts";
import type { ResponseUploadDto } from "../../types/upload.ts";

function useUploadImage() {
  return useMutation<ResponseUploadDto, Error, File>({
    mutationFn: uploadImage,
  });
}

export default useUploadImage;