import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../apis/axios";

interface LpPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LpPostModal = ({ isOpen, onClose }: LpPostModalProps) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const addTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (body: object) => {
      const response = await api.post("/lps", body);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      alert("새로운 LP가 등록되었습니다! 💿");
      onClose();
      setName("");
      setContent("");
      setTags([]);
      setFile(null);
    },
    onError: (error) => {
      console.error("LP 등록 실패:", error);
      alert("등록에 실패했어요. 다시 확인해주세요!");
    },
  });

  const handleSubmit = () => {
    if (!name || !content || tags.length === 0) {
      alert("모든 필드를 입력하고 태그도 하나 이상 넣어주세요!");
      return;
    }

    mutate({
      title: name,
      content,
      tags,
      published: true,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-[#2C2C34] p-8 text-white shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">✕</button>

        <div className="flex flex-col items-center gap-6">
          <div onClick={() => fileInputRef.current?.click()} className="group relative cursor-pointer">
            <img
              src={file ? URL.createObjectURL(file) : "https://raw.githubusercontent.com/Yong-Choi/UMC-8th-Frontend-Study/main/week7/lp-placeholder.png"}
              alt="LP Preview"
              className="h-44 w-44 rounded-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-xs font-bold">이미지 선택</span>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <div className="w-full space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="LP Name"
              className="w-full rounded-md bg-[#3A3A44] p-3 text-sm outline-none focus:ring-1 focus:ring-pink-500"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="LP Content"
              className="h-20 w-full rounded-md bg-[#3A3A44] p-3 text-sm outline-none focus:ring-1 focus:ring-pink-500"
            />

            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                placeholder="LP Tag"
                className="flex-1 rounded-md bg-[#3A3A44] p-3 text-sm outline-none focus:ring-1 focus:ring-pink-500"
              />
              <button
                onClick={addTag}
                className="rounded-md bg-zinc-500 px-4 py-2 text-sm hover:bg-zinc-600 transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-1 rounded-full bg-zinc-700 px-3 py-1 text-xs text-zinc-300">
                  <span>{tag}</span>
                  <button onClick={() => removeTag(index)} className="ml-1 hover:text-white">✕</button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className={`w-full rounded-md py-3 text-sm font-bold transition-colors ${
              isPending ? "bg-gray-600" : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {isPending ? "등록 중..." : "Add LP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpPostModal;