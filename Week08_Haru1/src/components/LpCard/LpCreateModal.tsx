import { useState, useRef, useEffect } from "react";
import usePostLp from "../../hooks/mutations/usePostLp";

interface LpCreateModalProps {
    onClose: () => void;
}

const LpCreateModal = ({ onClose }: LpCreateModalProps) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const { mutate: createLp, isPending } = usePostLp();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
    };

    const handleAddTag = () => {
        const trimmed = tagInput.trim();
        if (!trimmed || tags.includes(trimmed)) return;
        setTags((prev) => [...prev, trimmed]);
        setTagInput("");
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { e.preventDefault(); handleAddTag(); }
    };

    const handleRemoveTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) onClose();
    };

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const handleSubmit = () => {
        if (!title.trim()) { alert("LP 이름을 입력해주세요."); return; }
        createLp(
            { title, content, thumbnail: preview ?? "", tags },
            { onSuccess: onClose }
        );
    };

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
            <div className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl w-full max-w-md mx-4 p-6 shadow-2xl">
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <h2 className="text-lg font-bold text-gray-100 mb-5">LP 추가</h2>

                {/* 썸네일 업로드 */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-4 w-full h-36 rounded-xl border-2 border-dashed border-[#333] bg-[#111] flex items-center justify-center cursor-pointer hover:border-pink-500 transition-colors overflow-hidden"
                >
                    {preview ? (
                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-600">
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <span className="text-xs">클릭하여 이미지 업로드</span>
                        </div>
                    )}
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* LP 이름 */}
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="LP Name"
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:border-pink-500 outline-none mb-3 transition-colors"
                />

                {/* LP 내용 */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="LP Content"
                    rows={3}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:border-pink-500 outline-none mb-3 transition-colors resize-none"
                />

                {/* 태그 입력 */}
                <div className="flex gap-2 mb-3">
                    <input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="LP Tag"
                        className="flex-1 bg-[#111] border border-[#333] rounded-lg px-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:border-pink-500 outline-none transition-colors"
                    />
                    <button
                        onClick={handleAddTag}
                        className="px-4 py-2.5 bg-[#2a2a2a] text-gray-300 text-sm rounded-lg hover:bg-[#333] transition-colors cursor-pointer border-none"
                    >
                        Add
                    </button>
                </div>

                {/* 태그 목록 */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#222] border border-[#333] text-gray-400"
                            >
                                #{tag}
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer leading-none"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                {/* 제출 버튼 */}
                <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer border-none disabled:opacity-50"
                >
                    {isPending ? "등록 중..." : "Add LP"}
                </button>
            </div>
        </div>
    );
};

export default LpCreateModal;