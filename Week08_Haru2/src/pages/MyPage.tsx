import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import ConfirmModal from "../components/common/ConfirmModal";
import { useLogout } from "../hooks/mutations/useAuthMutations";
import { usePatchMyInfo, useWithdraw } from "../hooks/mutations/useMyPage";

const MyPage = () => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    const { data: me, isPending } = useGetMyInfo(accessToken);
    const { mutate: patchMyInfo, isPending: isSaving } = usePatchMyInfo();
    const { mutate: withdrawMutate, isPending: isWithdrawing } = useWithdraw();
    const { mutate: logoutMutate, isPending: isLoggingOut } = useLogout();

    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState(me?.data.name ?? "");
    const [bio, setBio] = useState(me?.data.bio ?? "");
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleStartEdit = () => {
        setNickname(me?.data.name ?? "");
        setBio(me?.data.bio ?? "");
        setPreviewImage(null);
        setIsEditing(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSave = () => {
        patchMyInfo(
            {
                name: nickname || undefined,
                bio: bio || undefined,
                profileImage: previewImage ?? undefined,
            },
            { onSuccess: () => setIsEditing(false) }
        );
    };

    const handleWithdraw = () => {
        withdrawMutate();
    };

    if (isPending) {
        return (
            <div className="max-w-xl mx-auto px-5 py-12">
                <div className="flex items-center gap-5 animate-pulse">
                    <div className="w-24 h-24 rounded-full bg-[#222]" />
                    <div className="space-y-2">
                        <div className="h-5 w-32 bg-[#222] rounded" />
                        <div className="h-3 w-48 bg-[#222] rounded" />
                    </div>
                </div>
            </div>
        );
    }

    const user = me?.data;
    const displayImage = previewImage ?? user?.avator;

    return (
        <div className="max-w-xl mx-auto px-5 py-12">
            {/* 프로필 영역 */}
            <div className="flex items-center gap-6 mb-10">
                {/* 아바타 */}
                <div className="relative flex-shrink-0">
                    <div
                        className={`w-24 h-24 rounded-full bg-[#222] overflow-hidden border-2 ${isEditing ? "border-pink-500 cursor-pointer" : "border-[#2a2a2a]"}`}
                        onClick={() => isEditing && fileInputRef.current?.click()}
                    >
                        {displayImage ? (
                            <img src={displayImage} alt="프로필" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                                <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                        )}
                    </div>
                    {isEditing && (
                        <div
                            className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                        </div>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>

                {/* 이름/bio */}
                <div className="flex-1">
                    {isEditing ? (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <input
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="닉네임"
                                    className="flex-1 bg-[#111] border border-[#333] focus:border-pink-500 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none transition-colors"
                                />
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-pink-600 hover:bg-pink-500 text-white cursor-pointer border-none disabled:opacity-50 transition-colors"
                                >
                                    {isSaving ? (
                                        <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <input
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="프론트 짱"
                                className="w-full bg-[#111] border border-[#333] focus:border-pink-500 rounded-lg px-3 py-2 text-sm text-gray-400 outline-none transition-colors"
                            />
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-base font-bold text-gray-200">
                                    {user?.name ?? "닉네임 없음"}
                                </span>
                                <button
                                    onClick={handleStartEdit}
                                    className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:text-gray-300 hover:bg-[#222] transition-colors bg-transparent border-none cursor-pointer"
                                    title="설정"
                                >
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                                    </svg>
                                </button>
                            </div>
                            {user?.bio && (
                                <p className="text-sm text-gray-500">{user.bio}</p>
                            )}
                            <p className="text-xs text-gray-600 mt-0.5">{user?.email}</p>
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-[#222] mb-8" />

            {/* 계정 관리 */}
            <div className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">계정 관리</h3>

                {/* 로그아웃 */}
                <button
                    onClick={() => logoutMutate()}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#111] text-gray-300 hover:border-[#333] hover:text-white transition-colors cursor-pointer text-sm disabled:opacity-50 text-left"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
                </button>

                {/* 탈퇴 */}
                <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#111] text-red-400 hover:border-red-400/30 hover:text-red-300 transition-colors cursor-pointer text-sm text-left"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                    탈퇴하기
                </button>
            </div>

            {/* 탈퇴 확인 모달 */}
            {showWithdrawModal && (
                <ConfirmModal
                    message="정말 탈퇴하시겠습니까?"
                    confirmLabel="예"
                    cancelLabel="아니요"
                    isLoading={isWithdrawing}
                    onConfirm={handleWithdraw}
                    onCancel={() => setShowWithdrawModal(false)}
                />
            )}
        </div>
    );
};

export default MyPage;