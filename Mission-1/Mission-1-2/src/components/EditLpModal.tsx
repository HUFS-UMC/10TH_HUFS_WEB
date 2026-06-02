import { useRef, useState } from "react";
import { X } from "lucide-react";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import { uploadImage } from "../apis/lp";
import type { LpDetail } from "../types/lp";

interface EditLpModalProps {
  lp: LpDetail;
  onClose: () => void;
}

const EditLpModal = ({ lp, onClose }: EditLpModalProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(lp.title);
  const [content, setContent] = useState(lp.content);
  const [thumbnail, setThumbnail] = useState<string | undefined>(lp.thumbnail);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    lp.thumbnail ?? null,
  );
  const [tags, setTags] = useState<string[]>(lp.tags.map((t) => t.name));
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: updateLp, isPending } = useUpdateLp(lp.id);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailPreview(URL.createObjectURL(file));
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setThumbnail(url);
    } catch {
      alert("이미지 업로드에 실패했습니다.");
      setThumbnailPreview(lp.thumbnail ?? null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    updateLp(
      { lpId: lp.id, title: title.trim(), content: content.trim(), thumbnail, tags },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111118] p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">LP 수정</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 제목 */}
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#807bff] transition"
        />

        {/* 내용 */}
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#807bff] transition resize-none"
        />

        {/* 썸네일 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">썸네일 이미지</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-300 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-white file:cursor-pointer hover:file:bg-white/20 transition"
          />
          {isUploading && <p className="text-xs text-gray-400">업로드 중...</p>}
          {thumbnailPreview && !isUploading && (
            <img
              src={thumbnailPreview}
              alt="미리보기"
              className="w-24 h-24 rounded-full object-cover border border-white/20"
            />
          )}
        </div>

        {/* 태그 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">태그</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="태그 입력 후 추가"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-white placeholder:text-white/40 outline-none focus:border-[#807bff] transition text-sm"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm hover:bg-white/20 transition"
            >
              추가
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#807bff]/20 text-[#a8a4ff] text-xs border border-[#807bff]/30"
                >
                  #{tag}
                  <button onClick={() => handleRemoveTag(tag)} className="hover:text-white transition">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 수정 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isPending || isUploading}
          className="w-full rounded-xl bg-[#807bff] py-3 font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/45"
        >
          {isPending ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
};

export default EditLpModal;
