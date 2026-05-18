import { useEffect, useState } from "react";
import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react";

import useUploadImage from "../hooks/mutations/useUploadImage.ts";
import useUpdateLp from "../hooks/mutations/useUpdateLp.ts";
import type { LpDetail } from "../types/lp.ts";

interface LpEditModalProps {
  lp: LpDetail;
  onClose: () => void;
}

const LpEditModal = ({ lp, onClose }: LpEditModalProps) => {
  const [title, setTitle] = useState(lp.title);
  const [content, setContent] = useState(lp.content);
  const [thumbnail, setThumbnail] = useState(lp.thumbnail);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(lp.tags.map((tag) => tag.name));
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(lp.thumbnail);

  const { mutateAsync: uploadImage, isPending: isUploadPending } =
    useUploadImage();

  const { mutateAsync: updateLp, isPending: isUpdatePending } = useUpdateLp();

  const isPending = isUploadPending || isUpdatePending;

  useEffect(() => {
    if (!file) {
      setPreviewUrl(thumbnail);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file, thumbnail]);

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

    try {
      let nextThumbnail = thumbnail;

      if (file) {
        const uploaded = await uploadImage(file);
        nextThumbnail = uploaded.data.imageUrl;
      }

      await updateLp({
        lpId: lp.id,
        title: title.trim(),
        content: content.trim(),
        thumbnail: nextThumbnail,
        tags,
        published: true,
      });

      alert("LP가 수정되었습니다.");
      onClose();
    } catch (error) {
      console.error("LP 수정 실패:", error);
      alert("LP 수정에 실패했습니다.");
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
        >
          ×
        </button>

        <h2 className="mb-5 text-xl font-bold">LP 수정</h2>

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
          LP 사진 변경
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <div className="flex flex-col gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="LP Name"
            className="rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="LP Content"
            rows={3}
            className="resize-none rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
          />

          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
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
            className="mt-3 rounded-md bg-pink-500 px-4 py-3 text-sm font-semibold text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "수정 중..." : "수정 완료"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpEditModal;