import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../apis/axios";

const MyPage = () => {
  const queryClient = useQueryClient();

  // 1️⃣ 통합 수정 모드 상태 (톱니바퀴 하나로 이름/바이오 동시 컨트롤!)
  const [isEditing, setIsEditing] = useState(false);
  
  // 입력창 상태 관리
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");

  // 내 프로필 정보 가져오기
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await api.get("/users/me"); // 💡 본인의 프로필 조회 API 주소 확인
      return res.data.data;
    },
  });

  // 🚀 낙관적 업데이트가 적용된 프로필 수정 Mutation
  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (updatedData: { name: string; bio: string }) => {
      // 💡 백엔드 스웨거에 맞게 주소랑 데이터 키값(name, bio 등) 확인!
      return await api.patch("/users", updatedData); 
    },
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: ["userProfile"] });
      const previousProfile = queryClient.getQueryData(["userProfile"]);

      // 캐시 즉시 업데이트 (이름, 바이오 동시 변경)
      queryClient.setQueryData(["userProfile"], (oldData: any) => ({
        ...oldData,
        name: updatedData.name,
        bio: updatedData.bio, // 백엔드 필드명이 role이면 role로 맞춰줘!
      }));

      // 네브바 업데이트를 위해 로컬 스토리지 즉시 변경 및 이벤트 발송
      localStorage.setItem("userName", updatedData.name);
      window.dispatchEvent(new Event("nicknameChanged"));

      return { previousProfile };
    },
    onError: (error, variables, context) => {
      console.error("프로필 변경 실패:", error);
      alert("프로필 변경에 실패했습니다. 😢");
      
      // 에러 시 원상복구 (롤백)
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

  // ⚙️ 톱니바퀴 버튼 클릭 시 (수정 모드 ON)
  const handleEditClick = () => {
    setIsEditing(true);
    setEditName(profile?.name || "");
    // 기존에 있던 바이오 값(없으면 기본값)을 입력창에 세팅
    setEditBio(profile?.bio || profile?.role || "프론트 짱"); 
  };

  // ✔️ 체크 버튼 클릭 시 (저장)
  const handleSaveClick = () => {
    if (!editName.trim()) return alert("닉네임을 입력해주세요.");
    
    // 바뀐 게 없으면 그냥 수정 모드만 종료
    if (editName === profile?.name && editBio === (profile?.bio || profile?.role)) {
      setIsEditing(false);
      return;
    }
    
    // 변경된 이름과 바이오를 한 번에 서버로 전송!
    updateProfile({ name: editName, bio: editBio });
    setIsEditing(false);
  };

  if (isLoading) return <div className="text-white p-10">로딩 중... 💿</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
        
        {/* 프로필 이미지 */}
        <div className="w-24 h-24 bg-zinc-700 rounded-full overflow-hidden flex items-center justify-center">
          <img 
            src={profile?.avatar || "/default-avatar.png"} 
            alt="profile" 
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = "https://placehold.co/150x150?text=No+Image")}
          />
        </div>

        {/* 닉네임 & 설정 버튼 영역 */}
        <div className="flex items-center gap-3">
          {isEditing ? (
            // [수정 모드] 닉네임 입력창 + 체크 버튼
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
            // [일반 모드] 닉네임 + 톱니바퀴 버튼
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

        {/* 바이오(한 줄 소개) & 이메일 영역 */}
        <div className="text-center text-sm space-y-2">
          {isEditing ? (
            // [수정 모드] 바이오 입력창
            <div>
              <input
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="bg-zinc-800 border border-zinc-600 rounded-md px-3 py-1 text-center outline-none w-48 text-zinc-300 focus:border-pink-500"
                placeholder="한 줄 소개를 입력하세요"
              />
            </div>
          ) : (
            // [일반 모드] 바이오 텍스트
            <div>
              <p className="border border-zinc-600 text-zinc-300 rounded-md px-3 py-1 inline-block">
                {profile?.bio || profile?.role || "프론트 짱"}
              </p>
            </div>
          )}
          
          <p className="text-zinc-400">{profile?.email}</p>
        </div>

      </div>
      
      {/* 이 아래는 내가 좋아요 한 LP 리스트 등 (생략) */}
    </div>
  );
};

export default MyPage;