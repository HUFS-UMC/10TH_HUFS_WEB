import { useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";

import useUploadImage from "../hooks/mutations/useUploadImage.ts";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo.ts";
import type { ResponseMyInfoDto } from "../types/auth.ts";

interface MyPageEditModalProps {
  myInfo: ResponseMyInfoDto["data"];
  onClose: () => void;
}

const MyPageEditModal = ({ myInfo, onClose }: MyPageEditModalProps) => {
  const [name, setName] = useState(myInfo.name ?? "");
  const [bio, setBio] = useState(myInfo.bio ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(myInfo.avatar ?? "");

  const { mutateAsync: uploadImage, isPending: isUploadPending } =
    useUploadImage();

  const { mutateAsync: updateMyInfo, isPending: isUpdatePending } =
    useUpdateMyInfo();

  const isPending = isUploadPending || isUpdatePending;

  useEffect(() => {
    if (!file) {
      setPreviewUrl(myInfo.avatar ?? "");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file, myInfo.avatar]);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    try {
      let avatar = myInfo.avatar ?? "";

      if (file) {
        const uploaded = await uploadImage(file);

        console.log("프로필 이미지 업로드 응답:", uploaded);

        avatar = uploaded.data.imageUrl;
      }

      const body = {
        name: name.trim(),
        bio: bio.trim(),
        avatar,
      };

      console.log("프로필 수정 요청 body:", body);

      await updateMyInfo(body);

      alert("프로필이 수정되었습니다.");
      onClose();
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl bg-gray-800 p-6 text-white shadow-2xl"
        onClick={handleModalClick}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-4 text-xl text-gray-300 hover:text-white"
          aria-label="모달 닫기"
        >
          ×
        </button>

        <h2 className="mb-6 text-xl font-bold">프로필 수정</h2>

        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-3">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="프로필 미리보기"
                className="h-32 w-32 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-600 text-5xl">
                👤
              </div>
            )}

            <label className="cursor-pointer rounded-md bg-gray-700 px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">
              사진 선택
              <input
                type="file"
                accept="image/*"
                name="avatar"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="이름"
              className="rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
            />

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              name="bio"
              placeholder="소개글"
              rows={4}
              className="resize-none rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
            />

            <p className="text-xs text-gray-400">
              Bio와 프로필 사진은 비워도 저장할 수 있습니다.
            </p>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="mt-2 rounded-md bg-pink-500 px-4 py-3 text-sm font-semibold text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageEditModal;