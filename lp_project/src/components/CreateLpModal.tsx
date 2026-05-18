import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {createLp} from "../apis/lp";
import type { CreatePayload } from "../types/lp";

interface CreateLpModalProps {
  onClose: () => void;
}

const CreateLpModal = ({ onClose }: CreateLpModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const queryClient = useQueryClient();
  

  const createLpMutation = useMutation({
    mutationFn: createLp,
    onSuccess: ()=> {
        queryClient.invalidateQueries({
            queryKey: ["lps"],
        });
        onClose();
    },
    onError: (error)=>{
        console.error(error);
        alert("LP 생성에 실패하였습니다.");
    }
  });

const handleCreateLp = () => {
  if (!lpName.trim()) {
    alert("LP 이름을 입력해주세요.");
    return;
  }

  if (!lpContent.trim()) {
    alert("LP 내용을 입력해주세요.");
    return;
  }

  const payload: CreatePayload = {
    title: lpName.trim(),
    content: lpContent.trim(),
    thumbnail: "https://via.placeholder.com/300",
    tags,
    published: true,
  };

  createLpMutation.mutate(payload);
};
  

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();

    if (trimmedTag === "") {
      return;
    }

    if (tags.includes(trimmedTag)) {
      setTagInput("");
      return;
    }

    setTags((prevTags) => [...prevTags, trimmedTag]);
    setTagInput("");
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToDelete)
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-[360px] rounded-lg bg-neutral-800 p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-3 text-xl text-gray-300"
        >
          ×
        </button>

        <div className="mb-6 flex justify-center">
          <label className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-sm text-gray-300">
            {imageFile ? imageFile.name : "LP Image"}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImageFile(file);
                }
              }}
            />
          </label>
        </div>

        <input
          value={lpName}
          onChange={(e) => setLpName(e.target.value)}
          placeholder="LP Name"
          className="mb-3 w-full rounded-md border border-gray-600 bg-neutral-900 px-3 py-2 text-sm outline-none"
        />

        <input
          value={lpContent}
          onChange={(e) => setLpContent(e.target.value)}
          placeholder="LP Content"
          className="mb-3 w-full rounded-md border border-gray-600 bg-neutral-900 px-3 py-2 text-sm outline-none"
        />

        <div className="mb-3 flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="LP Tag"
            className="flex-1 rounded-md border border-gray-600 bg-neutral-900 px-3 py-2 text-sm outline-none"
          />

          <button
            type="button"
            onClick={handleAddTag}
            className="rounded-md bg-gray-300 px-3 py-2 text-sm text-black"
          >
            Add
          </button>
        </div>

 
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 rounded-full bg-pink-500 px-3 py-1 text-sm text-white"
            >
              <span>#{tag}</span>

              <button
                type="button"
                onClick={() => handleDeleteTag(tag)}
                className="text-xs text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full rounded-md bg-gray-400 py-2 text-sm text-white"
          onClick={handleCreateLp}
          disabled={createLpMutation.isPending}
        >
          {createLpMutation.isPending ? "Adding.." : "Add LP"}
        </button>
      </div>
    </div>
  );
};

export default CreateLpModal;