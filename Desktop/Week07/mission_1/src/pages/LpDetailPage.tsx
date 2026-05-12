import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../apis/axios";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const { data: lpData, isLoading } = useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: async () => {
      const res = await api.get(`/lps/${lpId}`); 
      return res.data.data;
    },
  });

  useEffect(() => {
    if (lpData) {
      setEditText(lpData.title);
      setPreview(lpData.thumbnail);
    }
  }, [lpData, isEditing]);

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await api.patch(`/lps/${lpId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
      setIsEditing(false);
      setEditFile(null);
      alert("수정 완료! ✨");
    },
    onError: (error: any) => {
      alert(`수정 실패: ${error.response?.data?.message}`);
    }
  });


  const { mutate: deletePost } = useMutation({
    mutationFn: async () => await api.delete(`/lps/${lpId}`),
    onSuccess: () => {
      alert("삭제되었습니다.");
      navigate("/", { replace: true });
    },
  });

  const toggleLike = () => {
    console.log("좋아요 클릭됨!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (!editText.trim()) return alert("내용을 입력해주세요.");
    const formData = new FormData();
    formData.append("title", editText);
    if (editFile) formData.append("image", editFile);
    updatePost(formData);
  };

  if (isLoading) return <div className="text-white p-10">로딩 중... 💿</div>;
  if (!lpData) return <div className="text-white p-10">데이터를 불러오지 못했어요.</div>;

  const isOwner = true; 

  const myUserName = localStorage.getItem("userName");
  const authorUserName = lpData?.author?.email?.split("@")[0];
  console.log("내 아이디:", myUserName);
  console.log("글쓴이 아이디:", authorUserName);
  return (
    <div className="max-w-2xl mx-auto p-6 bg-zinc-900 rounded-3xl mt-10 shadow-xl border border-zinc-800">
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src={lpData.author?.avatar || "/default-avatar.png"} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="text-white font-bold">{lpData.author?.name || "익명"}</p>
            <p className="text-zinc-500 text-xs">{new Date(lpData.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex gap-3 text-zinc-400">
          {isEditing ? (
            <>
              <button onClick={() => fileInputRef.current?.click()} className="hover:text-white transition-colors" title="사진 변경">🖼️</button>
              <button onClick={handleSave} disabled={isUpdating} className="hover:text-green-400 transition-colors" title="저장">
                {isUpdating ? "⏳" : "✅"}
              </button>
              <button onClick={() => setIsEditing(false)} className="hover:text-red-400 transition-colors" title="취소">❌</button>
            </>
          ) : (
            isOwner && (
              <>
                <button onClick={() => setIsEditing(true)} className="hover:text-white transition-colors" title="수정">✏️</button>
                <button onClick={() => { if(confirm("정말 삭제하시겠습니까?")) deletePost(); }} className="hover:text-red-500 transition-colors" title="삭제">🗑️</button>
              </>
            )
          )}
        </div>
      </div>

      <div className="space-y-4">
        {isEditing ? (
          <input 
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl text-white outline-none focus:border-pink-500"
          />
        ) : (
          <p className="text-white text-lg px-2 whitespace-pre-wrap">{lpData.title}</p>
        )}

        <div className="relative rounded-2xl overflow-hidden bg-black aspect-square">
          <img 
            src={preview || lpData.thumbnail || "https://via.placeholder.com/500"} 
            className="w-full h-full object-cover transition-opacity"
            alt="lp album"
          />
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleLike}
            className={`text-2xl transition-transform active:scale-125 ${lpData.likes?.length > 0 ? 'text-pink-500' : 'text-zinc-500'}`}
          >
            {lpData.likes?.length > 0 ? "❤️" : "🤍"}
          </button>
          <span className="text-zinc-400 text-sm font-light">{lpData.likes?.length || 0} Likes</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800">
          {lpData.tags?.map((tag: any) => (
            <span key={tag.id} className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full border border-zinc-700">
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;