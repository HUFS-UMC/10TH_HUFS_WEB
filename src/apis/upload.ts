import axios from "axios";
import type { ResponseUploadDto } from "../types/upload.ts";

export const uploadImage = async (file: File): Promise<ResponseUploadDto> => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_API_URL}/v1/uploads/public`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};