import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMyInfo } from "../apis/auth.ts";
import { QUERY_KEY } from "../constants/key.ts";
import MyPageEditModal from "../components/MyPageEditModal.tsx";

const MyPage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    data: myInfo,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) {
    return (
      <div className="min-h-dvh bg-black px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl animate-pulse rounded-xl bg-gray-800 p-8">
          <div className="h-32 w-32 rounded-full bg-gray-600" />
          <div className="mt-6 h-6 w-40 rounded bg-gray-600" />
          <div className="mt-3 h-4 w-64 rounded bg-gray-600" />
          <div className="mt-3 h-4 w-52 rounded bg-gray-600" />
        </div>
      </div>
    );
  }

  if (isError || !myInfo) {
    return (
      <div className="min-h-dvh bg-black px-4 py-10 text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-xl bg-gray-800 p-8">
          <p>마이페이지 정보를 불러오지 못했습니다.</p>

          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-md bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const user = myInfo.data;

  return (
    <div className="min-h-dvh bg-black px-4 py-10 text-white">
      <section className="mx-auto max-w-3xl rounded-xl bg-gray-800 p-6 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-36 w-36 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gray-600 text-6xl">
                👤
              </div>
            )}

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{user.name}</h1>

              <p className="mt-2 text-gray-300">
                {user.bio || "소개글이 없습니다."}
              </p>

              <p className="mt-2 text-sm text-gray-400">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="rounded-md bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600"
          >
            ⚙ 설정
          </button>
        </div>
      </section>

      {isEditModalOpen && (
        <MyPageEditModal
          myInfo={user}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyPage;