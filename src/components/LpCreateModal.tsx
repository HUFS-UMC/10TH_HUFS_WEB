import { useEffect, useState } from "react";
import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react";

import useCreateLp from "../hooks/mutations/useCreateLp.ts";
import useUploadImage from "../hooks/mutations/useUploadImage.ts";

interface LpCreateModalProps {
  onClose: () => void;
}

const getUploadedImageUrl = (uploadedData: unknown) => {
  if (typeof uploadedData === "string") {
    return uploadedData;
  }

  if (!uploadedData || typeof uploadedData !== "object") {
    return "";
  }

  const data = uploadedData as Record<string, unknown>;

  const url =
    data.url ||
    data.imageUrl ||
    data.fileUrl ||
    data.path ||
    data.location ||
    data.filename;

  if (typeof url !== "string") {
    return "";
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${import.meta.env.VITE_SERVER_API_URL}${url}`;
  }

  return `${import.meta.env.VITE_SERVER_API_URL}/${url}`;
};

const LpCreateModal = ({ onClose }: LpCreateModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const { mutateAsync: uploadImage, isPending: isUploadPending } =
    useUploadImage();

  const { mutateAsync: createLp, isPending: isCreatePending } = useCreateLp();

  const isPending = isUploadPending || isCreatePending;

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

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

  const handleAddTag = () => {
    const nextTag = tagInput.trim();

    if (!nextTag) {
      return;
    }

    if (tags.includes(nextTag)) {
      setTagInput("");
      return;
    }

    setTags((prev) => [...prev, nextTag]);
    setTagInput("");
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (targetTag: string) => {
    setTags((prev) => prev.filter((tag) => tag !== targetTag));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("LP 제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("LP 내용을 입력해주세요.");
      return;
    }

    if (!file) {
      alert("LP 사진을 선택해주세요.");
      return;
    }

    try {
      const uploaded = await uploadImage(file);

      console.log("업로드 응답:", uploaded);
      console.log("업로드 data:", uploaded.data);

      const thumbnail = getUploadedImageUrl(uploaded.data);

      console.log("최종 thumbnail:", thumbnail);

      if (!thumbnail) {
        alert(
          "이미지 업로드 URL을 찾지 못했습니다. 콘솔의 업로드 응답을 확인해주세요.",
        );
        return;
      }

      await createLp({
        title: title.trim(),
        content: content.trim(),
        thumbnail,
        tags,
        published: true,
      });

      alert("LP가 등록되었습니다.");
      onClose();
    } catch (error) {
      console.error(error);
      alert("LP 등록에 실패했습니다.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-gray-800 p-6 text-white shadow-2xl"
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

        <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-black">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="LP 미리보기"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-[16px] border-gray-700 bg-black">
              <div className="h-10 w-10 rounded-full bg-white" />
            </div>
          )}
        </div>

        <label className="mb-4 block cursor-pointer rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-center text-sm text-gray-300 hover:border-pink-500 hover:text-pink-400">
          LP 사진 선택
          <input
            type="file"
            accept="image/*"
            name="thumbnail"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <div className="flex flex-col gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="LP Name"
            className="rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="content"
            placeholder="LP Content"
            rows={3}
            className="resize-none rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
          />

          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              name="tag"
              placeholder="LP Tag"
              className="flex-1 rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={handleAddTag}
              className="rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-white"
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-gray-700 px-3 py-1 text-sm"
                >
                  #{tag}

                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-300 hover:text-pink-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="mt-3 rounded-md bg-gray-300 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Adding..." : "Add LP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpCreateModal;