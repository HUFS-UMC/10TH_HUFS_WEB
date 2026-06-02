import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, Pencil, Trash2 } from "lucide-react";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import { useAuth } from "../context/AuthContext";
import { queryClient } from "../App";
import { QUERY_KEY } from "../constants/key";
import LpCardSkeleton from "../components/LpCard/LpCardSkeleton";
import EditLpModal from "../components/EditLpModal";
import CommentSection from "../components/Comment/CommentSection";
import UserAvatar from "../components/UserAvatar";
import { formatRelativeDate } from "../utils/date";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const lpId = Number(lpid);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const { data, isPending, isError, refetch } = useGetLpDetail({ lpId });
  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();
  const { mutate: deleteLp, isPending: isDeleting } = useDeleteLp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isPending) {
    return (
      <div className="max-w-lg mx-auto grid grid-cols-1 gap-4 p-4">
        <LpCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        <button
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, lpId] });
            refetch();
          }}
          className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 text-white text-sm transition"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const lp = data?.data;
  if (!lp) return null;

  const isLiked = lp.likes.some((like) => like.userId === me?.data.id);
  const isAuthor = !!me?.data.id && lp.authorId === me.data.id;

  const handleDeleteLp = () => {
    if (!confirm("정말 이 LP를 삭제하시겠습니까?")) return;
    deleteLp({ lpId }, { onSuccess: () => navigate("/") });
  };

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      {/* 작성자 정보 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <UserAvatar avatar={lp.author?.avatar} name={lp.author?.name} size="md" />
          <span className="text-sm text-gray-300">{lp.author?.name}</span>
        </div>
        <span className="text-xs text-gray-500">{formatRelativeDate(lp.createdAt)}</span>
      </div>

      {/* 제목 */}
      <h1 className="text-xl font-bold mb-4">{lp.title}</h1>

      {/* 수정/삭제 (본인만) */}
      {isAuthor && (
        <div className="flex justify-end gap-2 mb-4">
          <button onClick={() => setIsEditModalOpen(true)} className="p-2 rounded hover:bg-white/10 transition text-gray-400 hover:text-white" title="수정">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={handleDeleteLp} disabled={isDeleting} className="p-2 rounded hover:bg-white/10 transition text-gray-400 hover:text-red-400 disabled:opacity-50" title="삭제">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 썸네일 */}
      <div className="flex justify-center mb-6">
        <img src={lp.thumbnail} alt={lp.title} className="w-64 h-64 rounded-full object-cover shadow-2xl" />
      </div>

      {/* 본문 */}
      <p className="text-gray-300 text-sm leading-relaxed mb-6">{lp.content}</p>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {lp.tags.map((tag) => (
          <span key={tag.id} className="px-2 py-1 rounded-full bg-white/10 text-gray-300 text-xs">#{tag.name}</span>
        ))}
      </div>

      {/* 좋아요 */}
      <div className="flex justify-center mb-10">
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          onClick={isLiked ? () => dislikeMutate({ lpId }) : () => likeMutate({ lpId })}
        >
          <Heart color={isLiked ? "red" : undefined} fill={isLiked ? "red" : "none"} />
          <span>{lp.likes.length}</span>
        </button>
      </div>

      {isEditModalOpen && <EditLpModal lp={lp} onClose={() => setIsEditModalOpen(false)} />}

      {/* 댓글 섹션 */}
      <CommentSection lpId={lpId} myId={me?.data.id} />
    </div>
  );
};

export default LpDetailPage;
