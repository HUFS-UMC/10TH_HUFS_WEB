import { axiosInstance } from "./axios";

/* 내 정보 수정 */
export const updateMyInfo = async (body: {
  nickname?: string;
  bio?: string;
  profileImage?: File | null;
}) => {
  const formData = new FormData();

  if (body.nickname) formData.append("nickname", body.nickname);
  if (body.bio) formData.append("bio", body.bio);
  if (body.profileImage) {
    formData.append("profileImage", body.profileImage);
  }

  const { data } = await axiosInstance.patch(
    "/v1/users",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

/* 탈퇴 */
export const deleteUser = async () => {
  const { data } = await axiosInstance.delete("/v1/users");
  return data;
};