import { useRef, useState } from "react";
import { X } from "lucide-react";
import useUpdateUser from "../hooks/mutations/useUpdateUser";
import { uploadImage } from "../apis/lp";

interface EditProfileModalProps {
  initialName: string;
  initialBio?: string | null;
  initialAvatar?: string | null;
  onClose: () => void;
}

const EditProfileModal = ({
  initialName,
  initialBio,
  initialAvatar,
  onClose,
}: EditProfileModalProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio ?? "");
  const [avatar, setAvatar] = useState<string | undefined>(initialAvatar ?? undefined);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialAvatar ?? null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setAvatar(url);
    } catch {
      alert("이미지 업로드에 실패했습니다.");
      setAvatarPreview(initialAvatar ?? null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = () => {
    updateUser(
      { name: name.trim() || initialName, bio: bio || undefined, avatar },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111118] p-6 shadow-2xl flex flex-col gap-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">프로필 수정</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 아바타 */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="프로필"
                className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#f472b6] flex items-center justify-center text-white text-2xl font-bold border-2 border-white/20">
                {(name || initialName)[0] ?? "?"}
              </div>
            )}
          </div>
          <label className="cursor-pointer text-xs text-[#807bff] hover:text-[#a8a4ff] transition">
            사진 변경
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {isUploading && <p className="text-xs text-gray-400">업로드 중...</p>}
        </div>

        {/* 이름 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#807bff] transition"
          />
        </div>

        {/* Bio (선택) */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Bio (선택)</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="자기소개를 입력하세요"
            rows={3}
            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#807bff] transition resize-none text-sm"
          />
        </div>

        {/* 저장 버튼 */}
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

export default EditProfileModal;
