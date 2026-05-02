import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useLikeLp from "../hooks/queries/useLikeLp";
import useDeleteLp from "../hooks/queries/useDeleteLp";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const LpDetail = () => {
    const { lpId } = useParams<{ lpId: string }>();
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    const id = Number(lpId);

    console.log("1. params에서 온 lpId:", lpId);
    console.log("2. 숫자로 바꾼 id:", id);
    console.log("3. 숫자인지 체크:", typeof id, !isNaN(id));

    const { data: lp, isPending, isError } = useGetLpDetail(id);
    const { mutate: toggleLike, isPending: isLiking } = useLikeLp(id);
    const { mutate: handleDelete, isPending: isDeleting } = useDeleteLp();

    // ── 로딩 (목록과 동일한 스켈레톤 패턴) ──
    if (isPending) {
        return (
            <div className="max-w-2xl mx-auto px-5 py-8">
                <div className="grid grid-cols-1 gap-3 mb-6">
                    <LpCardSkeletonList count={1} />
                </div>
                <div className="h-7 w-3/5 rounded-md bg-[#1e1e1e] animate-pulse mb-3" />
                <div className="h-3.5 w-2/5 rounded-md bg-[#1e1e1e] animate-pulse mb-6" />
                <div className="h-3.5 w-full rounded-md bg-[#1e1e1e] animate-pulse mb-2" />
                <div className="h-3.5 w-4/5 rounded-md bg-[#1e1e1e] animate-pulse" />
            </div>
        );
    }

    // ── 에러 (목록과 동일한 패턴) ──
    if (isError || !lp) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-500">
                <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm">LP를 불러오지 못했어요.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="text-xs px-5 py-2 rounded-md border border-[#333] text-gray-400 hover:text-gray-200 transition-colors cursor-pointer bg-transparent"
                >
                    돌아가기
                </button>
            </div>
        );
    }

    // TODO: AuthContext에서 userId 노출 시 실제 비교로 교체
    // const isLiked = lp.likes?.some((like) => like.userId === myUserId) ?? false;
    const isLiked = false;

    const confirmDelete = () => {
        if (window.confirm("정말 삭제하시겠어요?")) {
            handleDelete(id);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-5 py-8 pb-28">

            {/* ── 날짜 + 수정/삭제 ── */}
            <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500">
                    {new Date(lp.createAt).toLocaleDateString("ko-KR")}
                </p>

                {/* 수정/삭제 버튼: 로그인 상태에서만 노출 */}
                {accessToken && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate(`/lp/${id}/edit`)}
                            className="w-8 h-8 flex items-center justify-center rounded-md border border-[#2a2a2a] text-gray-400 hover:text-white hover:border-[#444] bg-transparent transition-colors cursor-pointer"
                            title="수정"
                        >
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </button>
                        <button
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="w-8 h-8 flex items-center justify-center rounded-md border border-[#2a2a2a] text-red-400 hover:text-red-300 hover:border-red-400/40 bg-transparent transition-colors cursor-pointer disabled:opacity-50"
                            title="삭제"
                        >
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                <path d="M10 11v6M14 11v6" />
                                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* ── 제목 ── */}
            <h1 className="text-2xl font-bold text-gray-100 leading-snug mb-5">
                {lp.title}
            </h1>

            {/* ── 썸네일 ── */}
            {lp.thumbnail && (
                <div className="mb-6 rounded-xl overflow-hidden bg-[#1a1a1a]">
                    <img src={lp.thumbnail} alt={lp.title} className="w-full block object-cover" />
                </div>
            )}

            {/* ── 본문 ── */}
            {lp.content && (
                <p className="text-sm text-gray-400 leading-relaxed mb-7 whitespace-pre-wrap">
                    {lp.content}
                </p>
            )}

            {/* ── 태그 ── */}
            {lp.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-7">
                    {lp.tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="text-xs px-2.5 py-1 rounded-full bg-[#1e1e1e] border border-[#333] text-gray-400"
                        >
                            #{tag.name}
                        </span>
                    ))}
                </div>
            )}

            {/* ── 좋아요 버튼 ── */}
            <button
                onClick={() => toggleLike(isLiked)}
                disabled={isLiking || !accessToken}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm transition-all cursor-pointer ${
                    isLiked
                        ? "border-[#ff2d78] bg-[#ff2d78]/10 text-[#ff2d78]"
                        : "border-[#333] bg-transparent text-gray-400 hover:border-[#555] hover:text-gray-200"
                } disabled:cursor-not-allowed disabled:opacity-60`}
            >
                <svg
                    width="15" height="15"
                    fill={isLiked ? "currentColor" : "none"}
                    stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
                </svg>
                {lp.likes?.length ?? 0}
            </button>

            {/* ── 목록으로 ── */}
            <button
                onClick={() => navigate(-1)}
                className="mt-10 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer"
            >
                ← 목록으로
            </button>
        </div>
    );
};

export default LpDetail;