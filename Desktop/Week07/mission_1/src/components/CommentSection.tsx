import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { api } from "../apis/axios";

interface CommentSectionProps {
  lpId: string;
}

const CommentSection = ({ lpId }: CommentSectionProps) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const { data: commentData } = useQuery({
    queryKey: ["comments", lpId],
    queryFn: async () => {
      const res = await api.get(`/lps/${lpId}/comments`);
      return res.data;
    },
  });

  const { mutate: postComment } = useMutation({
    mutationFn: (newContent: string) => api.post(`/lps/${lpId}/comments`, { content: newContent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
      setContent("");
    },
  });


const { mutate: updateComment } = useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) => 

      api.patch(`/lps/${lpId}/comments/${id}`, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
      setEditingId(null);
      alert("댓글이 수정되었습니다! ✨");
    },
  });
  

  const { mutate: deleteComment } = useMutation({
    mutationFn: (id: number) => 
      api.delete(`/lps/${lpId}/comments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
      alert("댓글이 삭제되었습니다. 🗑️");
    },
  });


  const comments = Array.isArray(commentData?.data.data) ? commentData.data.data : [];

  return (
    <div className="mt-10 space-y-8 bg-[#1e1e1e] p-6 rounded-2xl border border-gray-800">
      <h3 className="text-xl font-bold border-b border-gray-800 pb-4">
        댓글 <span className="text-pink-500">{comments.length}</span>
      </h3>

      <div className="flex gap-3 items-center">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="따뜻한 댓글을 남겨주세요..."
          className="flex-1 bg-[#2c2c2c] p-3 rounded-lg outline-none focus:ring-1 focus:ring-pink-500 text-sm"
        />
        <button
          onClick={() => content.trim() && postComment(content)}
          className="bg-pink-500 px-6 py-3 rounded-lg font-bold text-sm hover:bg-pink-600 transition-colors"
        >
          작성
        </button>
      </div>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment: any) => (
            <div key={comment.id} className="group flex justify-between items-start border-b border-gray-800 pb-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-200">{comment.author?.nickname || "익명"}</span>
                  <span className="text-[10px] text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {editingId === comment.id ? (
                  <div className="flex gap-2 mt-2">
                    <input
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="flex-1 bg-[#3a3a44] p-2 rounded text-sm outline-none border border-pink-500"
                    />
                    <button 
                      onClick={() => updateComment({ id: comment.id, content: editContent })}
                      className="text-xs text-pink-500 font-bold"
                    >
                      완료
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-xs text-gray-400">취소</button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-300 leading-relaxed">{comment.content}</p>
                )}
              </div>

              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditContent(comment.content);
                  }} 
                  className="text-gray-500 hover:text-white text-xs"
                >
                  수정
                </button>
                <button 
                  onClick={() => confirm("정말 삭제하시겠습니까?") && deleteComment(comment.id)} 
                  className="text-gray-500 hover:text-red-500 text-xs"
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-10">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;