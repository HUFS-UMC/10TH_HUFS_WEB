import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDeleteComment, usePatchComment } from "../hooks/mutations/useCommentMutations";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import type { Comment as LpComment } from "../types/lp";
import { useGetComments } from "../hooks/queries/useGetComments";
import { usePostComment } from "../hooks/queries/usePostComment";

const LpCommentSection = ({ lpId }: { lpId: number }) => {
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const { ref, inView } = useInView();
    const { accessToken } = useAuth();
    const { data: me } = useGetMyInfo(accessToken);

    const { data, fetchNextPage, hasNextPage, isPending, isFetchingNextPage } = useGetComments(lpId);
    const { mutate: postCommentMutate, isPending: isPosting } = usePostComment(lpId);
    const { mutate: deleteCommentMutate, isPending: isDeleting } = useDeleteComment(lpId);
    const { mutate: patchCommentMutate, isPending: isPatching } = usePatchComment(lpId);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // 바깥 클릭 시 메뉴 닫기
    useEffect(() => {
        const handler = () => setOpenMenuId(null);
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    const handleAddComment = () => {
        if (!content.trim()) { alert("댓글 내용을 입력해주세요!"); return; }
        postCommentMutate(content, { onSuccess: () => setContent("") });
    };

    const handleStartEdit = (comment: LpComment) => {
        setEditingId(comment.id);
        setEditContent(comment.content);
        setOpenMenuId(null);
    };

    const handleConfirmEdit = (commentId: number) => {
        if (!editContent.trim()) return;
        patchCommentMutate(
            { commentId, content: editContent },
            { onSuccess: () => { setEditingId(null); setEditContent(""); } }
        );
    };

    const handleDelete = (commentId: number) => {
        if (window.confirm("댓글을 삭제할까요?")) {
            deleteCommentMutate(commentId);
        }
    };

    const allComments = (data?.pages.flatMap((page) => page.data.data) || []) as unknown as LpComment[];
    const myId = me?.data.id;

    return (
        <div className="mt-12 bg-[#161616] rounded-2xl p-6 border border-[#222]">
            <h2 className="text-lg font-bold text-gray-200 mb-6">댓글</h2>

            {/* 댓글 입력 */}
            {accessToken && (
                <div className="mb-8 flex gap-3">
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleAddComment(); }}
                        disabled={isPosting}
                        placeholder={isPosting ? "등록 중..." : "댓글을 입력해주세요"}
                        className="flex-1 bg-[#0f0f0f] border border-[#333] rounded-lg px-4 py-3 text-sm text-gray-300 focus:border-pink-500 outline-none transition-all disabled:opacity-50"
                    />
                    <button
                        onClick={handleAddComment}
                        disabled={isPosting}
                        className="bg-[#333] text-gray-300 px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#444] transition-colors disabled:opacity-50 cursor-pointer border-none"
                    >
                        {isPosting ? "..." : "작성"}
                    </button>
                </div>
            )}

            {/* 로딩 */}
            {isPending && (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3 animate-pulse">
                            <div className="w-10 h-10 rounded-full bg-[#222] flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-24 bg-[#222] rounded" />
                                <div className="h-3 w-full bg-[#222] rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 댓글 목록 */}
            <div className="space-y-6">
                {allComments.map((comment) => {
                    const isMine = comment.userId === myId;
                    const isEditing = editingId === comment.id;

                    return (
                        <div key={comment.id} className="flex gap-3">
                            {/* 아바타 */}
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0 overflow-hidden">
                                {comment.user?.profileImage ? (
                                    <img src={comment.user.profileImage} alt="" className="w-full h-full object-cover" />
                                ) : null}
                            </div>

                            <div className="flex-1">
                                <span className="text-sm font-bold text-gray-300">{comment.user?.name}</span>

                                {/* 수정 모드 */}
                                {isEditing ? (
                                    <div className="flex gap-2 mt-1">
                                        <input
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === "Enter") handleConfirmEdit(comment.id); if (e.key === "Escape") setEditingId(null); }}
                                            className="flex-1 bg-[#0f0f0f] border border-pink-500 rounded-lg px-3 py-1.5 text-sm text-gray-300 outline-none"
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => handleConfirmEdit(comment.id)}
                                            disabled={isPatching}
                                            className="text-xs px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg cursor-pointer border-none disabled:opacity-50"
                                        >
                                            {isPatching ? "..." : "✓"}
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="text-xs px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#333] text-gray-400 rounded-lg cursor-pointer border-none"
                                        >
                                            취소
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 mt-1">{comment.content}</p>
                                )}
                            </div>

                            {/* 내 댓글 ... 메뉴 */}
                            {isMine && !isEditing && (
                                <div className="relative flex-shrink-0">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId((prev) => (prev === comment.id ? null : comment.id));
                                        }}
                                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-300 rounded-md hover:bg-[#222] transition-colors bg-transparent border-none cursor-pointer"
                                    >
                                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                            <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                                        </svg>
                                    </button>
                                    {openMenuId === comment.id && (
                                        <div
                                            className="absolute right-0 top-8 z-10 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg shadow-xl overflow-hidden min-w-[80px]"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                onClick={() => handleStartEdit(comment)}
                                                className="w-full px-4 py-2 text-xs text-gray-300 hover:bg-[#2a2a2a] text-left cursor-pointer bg-transparent border-none"
                                            >
                                                수정
                                            </button>
                                            <button
                                                onClick={() => { setOpenMenuId(null); handleDelete(comment.id); }}
                                                disabled={isDeleting}
                                                className="w-full px-4 py-2 text-xs text-red-400 hover:bg-[#2a2a2a] text-left cursor-pointer bg-transparent border-none disabled:opacity-50"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {isFetchingNextPage && (
                <div className="flex justify-center mt-4">
                    <div className="w-5 h-5 border-2 border-gray-600 border-t-pink-500 rounded-full animate-spin" />
                </div>
            )}

            <div ref={ref} className="h-4" />
        </div>
    );
};

export default LpCommentSection;