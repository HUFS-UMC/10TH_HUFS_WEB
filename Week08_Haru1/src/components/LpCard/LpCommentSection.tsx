import { useState, useEffect } from "react"; // useState 추가
import { useInView } from "react-intersection-observer";
import { useGetComments } from "../../hooks/queries/useGetComments";
import { usePostComment } from "../../hooks/queries/usePostComment"; // 방금 만든 훅
import type { Comment as LpComment } from "../../types/lp";

const LpCommentSection = ({ lpId }: { lpId: number }) => {
    const [content, setContent] = useState(""); // 입력값 상태
    const { ref, inView } = useInView();
    
    const { data, fetchNextPage, hasNextPage, isPending, isFetchingNextPage } = useGetComments(lpId);
    const { mutate: postCommentMutate, isPending: isPosting } = usePostComment(lpId);

    // 댓글 등록 함수
    const handleAddComment = () => {
        if (!content.trim()) {
            alert("댓글 내용을 입력해주세요!");
            return;
        }
        postCommentMutate(content, {
            onSuccess: () => setContent(""), // 등록 성공 시 입력창 비우기
        });
    };

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allComments = (data?.pages.flatMap((page) => page.data.data) || []) as unknown as LpComment[];

    return (
        <div className="mt-12 bg-[#161616] rounded-2xl p-6 border border-[#222]">
            <h2 className="text-lg font-bold text-gray-200 mb-6">댓글</h2>

            {/* ✅ 댓글 입력창 파트 */}
            <div className="mb-8 flex gap-3">
                <input 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isPosting}
                    className="flex-1 bg-[#0f0f0f] border border-[#333] rounded-lg px-4 py-3 text-sm text-gray-300 focus:border-pink-500 outline-none transition-all disabled:opacity-50" 
                    placeholder={isPosting ? "등록 중..." : "댓글을 입력해주세요"} 
                />
                <button 
                    onClick={handleAddComment}
                    disabled={isPosting}
                    className="bg-[#333] text-gray-300 px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#444] transition-colors disabled:opacity-50"
                >
                    {isPosting ? "..." : "작성"}
                </button>
            </div>

            {/* 댓글 목록 렌더링 (기존과 동일) */}
            <div className="space-y-6">
                {allComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 animate-fadeIn">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0" />
                        <div className="flex-1">
                            <span className="text-sm font-bold text-gray-300">{comment.user?.nickname}</span>
                            <p className="text-sm text-gray-400 mt-1">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div ref={ref} className="h-4" />
        </div>
    );
};

export default LpCommentSection;