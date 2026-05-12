import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../apis/axios";

const MyPage = () => {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res.data.data;
    },
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (updatedData: { name: string; bio: string }) => {
      return await api.patch("/users", updatedData); 
    },
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: ["userProfile"] });
      const previousProfile = queryClient.getQueryData(["userProfile"]);

      queryClient.setQueryData(["userProfile"], (oldData: any) => ({
        ...oldData,
        name: updatedData.name,
        bio: updatedData.bio,
      }));

      localStorage.setItem("userName", updatedData.name);
      window.dispatchEvent(new Event("nicknameChanged"));

      return { previousProfile };
    },
    onError: (error, variables, context) => {
      console.error("프로필 변경 실패:", error);
      alert("프로필 변경에 실패했습니다. 😢");
      
      if (context?.previousProfile) {
        queryClient.setQueryData(["userProfile"], context.previousProfile);
        localStorage.setItem("userName", (context.previousProfile as any).name);
        window.dispatchEvent(new Event("nicknameChanged"));
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    }
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setEditName(profile?.name || "");
    setEditBio(profile?.bio || profile?.role || "프론트 짱"); 
  };

  const handleSaveClick = () => {
    if (!editName.trim()) return alert("닉네임을 입력해주세요.");
    
    if (editName === profile?.name && editBio === (profile?.bio || profile?.role)) {
      setIsEditing(false);
      return;
    }
    
    updateProfile({ name: editName, bio: editBio });
    setIsEditing(false);
  };

  if (isLoading) return <div className="text-white p-10">로딩 중... 💿</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">

        <div className="w-24 h-24 bg-zinc-700 rounded-full overflow-hidden flex items-center justify-center">
          <img 
            src={profile?.avatar || "/default-avatar.png"} 
            alt="profile" 
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = "https://placehold.co/150x150?text=No+Image")}
          />
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <div className="flex items-center gap-2 border-b border-pink-500 pb-1">
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="bg-transparent text-2xl font-bold text-center outline-none w-48 focus:text-pink-300 transition-colors"
                autoFocus
              />
              <button 
                onClick={handleSaveClick}
                disabled={isPending}
                className="text-white hover:text-green-400 transition-colors"
                title="저장"
              >
                ✔️
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{profile?.name || "익명"}</h1>
              <button 
                onClick={handleEditClick}
                className="text-zinc-400 hover:text-white transition-colors"
                title="프로필 수정"
              >
                ⚙️
              </button>
            </div>
          )}
        </div>

        <div className="text-center text-sm space-y-2">
          {isEditing ? (
            <div>
              <input
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="bg-zinc-800 border border-zinc-600 rounded-md px-3 py-1 text-center outline-none w-48 text-zinc-300 focus:border-pink-500"
                placeholder="한 줄 소개를 입력하세요"
              />
            </div>
          ) : (
            <div>
              <p className="border border-zinc-600 text-zinc-300 rounded-md px-3 py-1 inline-block">
                {profile?.bio || profile?.role || "프론트 짱"}
              </p>
            </div>
          )}
          
          <p className="text-zinc-400">{profile?.email}</p>
        </div>

      </div>
      
    </div>
  );
};

export default MyPage;