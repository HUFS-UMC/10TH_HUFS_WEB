import { useState } from "react";
import useCreateLp from "../../hooks/mutations/useCreateLp";

interface Props {
  onClose: () => void;
}

const CreateLpModal = ({
  onClose,
}: Props) => {

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [tagInput, setTagInput] =
    useState("");

  const [tags, setTags] = useState<
    string[]
  >([]);

  const {
    mutate: createMutate,
  }= useCreateLp();  

  const [thumbnail, setThumbnail] =
    useState<File | null>(null);

  const handleAddTag = () => {
    if (!tagInput.trim()) return;

    setTags((prev) => [
      ...prev,
      tagInput,
    ]);

    setTagInput("");
  };

  const handleDeleteTag = (
    target: string
  ) => {
    setTags((prev) =>
      prev.filter(
        (tag) => tag !== target
      )
    );
  };

  const handleSubmit = () => {

    const formData = new FormData();

  formData.append("title", title);

  formData.append(
      "content",
      content
  );

  tags.forEach((tag) => {
      formData.append("tags", tag);
  });

  if (thumbnail) {
      formData.append(
      "thumbnail",
      thumbnail
      );
  }

  createMutate(formData, {
      onSuccess: () => {
      onClose();
      },
  });
  };  

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="bg-white w-full max-w-lg rounded-lg p-6"
      >

        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            LP 추가
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        {/* 제목 */}
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="제목"
          className="w-full border p-2 rounded mb-3"
        />

        {/* 내용 */}
        <textarea
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          placeholder="내용"
          className="w-full border p-2 rounded mb-3"
        />

        {/* 파일 */}
        <input
          type="file"
          onChange={(e) =>
            setThumbnail(
              e.target.files?.[0] || null
            )
          }
          className="mb-3"
        />

        {/* 태그 입력 */}
        <div className="flex gap-2 mb-3">
          <input
            value={tagInput}
            onChange={(e) =>
              setTagInput(
                e.target.value
              )
            }
            placeholder="태그 입력"
            className="flex-1 border p-2 rounded"
          />

          <button
            onClick={handleAddTag}
            className="px-3 py-2 bg-pink-500 text-white rounded"
          >
            추가
          </button>
        </div>

        {/* 태그 목록 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <div
              key={tag}
              className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span>{tag}</span>

              <button
                onClick={() =>
                  handleDeleteTag(
                    tag
                  )
                }
              >
                x
              </button>
            </div>
          ))}
        </div>

        {/* 버튼 */}
        <button
        onClick={handleSubmit}
        className="w-full bg-pink-500 text-white py-2 rounded"
        >
        Add LP
        </button>
      </div>
    </div>
  );
};

export default CreateLpModal;