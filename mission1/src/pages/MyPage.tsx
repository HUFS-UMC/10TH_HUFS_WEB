import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import { updateMyInfo } from "../apis/user.ts";
import type { ResponseMyInfoDto } from "../types/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../apis/user";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  /* ---------------- 수정 state ---------------- */
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  /* ---------------- 내 정보 조회 ---------------- */
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);

      // 초기값 세팅
      setName(response.data.name);
      setBio(response.data.bio || "");
    };

    getData();
  }, []);

  /* ---------------- 로그아웃 ---------------- */
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  /* ---------------- 수정 mutation ---------------- */
  const updateMutation = useMutation({
    mutationFn: updateMyInfo,

    onSuccess: () => {
      alert("수정 완료");

      // 🔥 최신 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });

      setIsEditOpen(false);
    },

    onError: () => {
      alert("수정 실패");
    },
  });

  /* ---------------- 탈퇴 mutation ---------------- */  
  const deleteMutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: async () => {
      alert("탈퇴 완료");

      await logout(); // 토큰 삭제

      navigate("/login");
    },

    onError: () => {
      alert("탈퇴 실패");
    },
  });  

  const handleUpdate = () => {
    updateMutation.mutate({
      nickname: name,  
      bio,
      profileImage: avatar, 
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };  

  return (
    <div className="max-w-xl mx-auto p-6">

      {/* ================= 사용자 정보 ================= */}
      <h1 className="text-xl font-bold">
        {data?.data?.name}님 환영합니다
      </h1>

      <img
        src={data?.data?.avatar as string}
        className="w-20 h-20 rounded-full mt-3"
      />

      <p>{data?.data?.email}</p>

      {/* ================= 버튼 ================= */}
      <div className="flex gap-2 mt-4">

        <button
          onClick={() => setIsEditOpen(true)}
          className="bg-blue-400 px-3 py-1 rounded text-white"
        >
          수정
        </button>

        <button
          onClick={handleLogout}
          className="bg-gray-400 px-3 py-1 rounded text-white"
        >
          로그아웃
        </button>

        <button
          onClick={() => setIsDeleteOpen(true)}
          className="bg-red-400 px-3 py-1 rounded text-white"
        >
          탈퇴
        </button>
      </div>

      {/* ================= 수정 모달 ================= */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-[400px]">

            <h2 className="text-lg font-bold mb-4">
              프로필 수정
            </h2>

            {/* 이름 */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 mb-2"
              placeholder="이름"
            />

            {/* bio */}
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border p-2 mb-2"
              placeholder="소개"
            />

            {/* 이미지 */}
            <input
              type="file"
              onChange={(e) =>
                setAvatar(e.target.files?.[0] || null)
              }
              className="mb-2"
            />

            {/* 버튼 */}
            <div className="flex justify-end gap-2">

              <button
                onClick={() => setIsEditOpen(false)}
                className="px-3 py-1 border rounded"
              >
                취소
              </button>

              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                저장
              </button>

            </div>

          </div>
        </div>
      )}
      {isDeleteOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setIsDeleteOpen(false)}
        >
          <div
            className="bg-white p-6 rounded w-[300px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-2">
              정말 탈퇴하시겠습니까?
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              탈퇴하면 모든 데이터가 삭제됩니다.
            </p>

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-3 py-1 border rounded"
              >
                취소
              </button>

              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                탈퇴
              </button>

            </div>
          </div>
        </div>
      )}      
    </div>
  );
};

export default MyPage;