import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  updateMyProfileApi,
  type UpdateMyProfilePayload,
} from "../apis/user";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const navigate = useNavigate();
  const { user, saveUser, isAuthenticated } = useAuth();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user) {
      setName(user.name);
      setBio(user.bio ?? "");
    }
  }, [isAuthenticated, user, navigate]);

  const updateProfileMutation = useMutation({
    mutationFn: updateMyProfileApi,

    onMutate: async (payload: UpdateMyProfilePayload) => {
      const previousUser = user;

      if (user) {
        saveUser({
          ...user,
          name: payload.name,
          bio: payload.bio ?? user.bio ?? null,
        });
      }

      return { previousUser };
    },

    onError: (error, _payload, context) => {
      console.error(error);

      if (context?.previousUser) {
        saveUser(context.previousUser);
      }

      alert("프로필 수정에 실패했습니다.");
    },

    onSuccess: (response) => {
      const responseBody = response.data ?? response;

      if (!user) return;

      saveUser({
        ...user,
        id: responseBody.id ?? user.id,
        name: responseBody.name ?? name,
        email: responseBody.email ?? user.email,
        bio: responseBody.bio ?? bio,
        avatar: responseBody.avatar ?? user.avatar ?? null,
      });

      alert("프로필이 수정되었습니다.");
    },
  });

  const handleUpdateProfile = () => {
    const trimmedName = name.trim();
    const trimmedBio = bio.trim();

    if (!trimmedName) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    updateProfileMutation.mutate({
      name: trimmedName,
      bio: trimmedBio || null,
      avatar: user?.avatar ?? null,
    });
  };

  if (!user) {
    return <div className="text-white">마이페이지 로딩 중...</div>;
  }

  return (
    <section className="mx-auto max-w-2xl text-white">
      <h1 className="mb-8 text-2xl font-bold">마이페이지</h1>

      <div className="rounded-xl bg-neutral-900 p-8">
        <div className="flex items-center gap-8">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-neutral-700 text-5xl text-white">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="프로필 이미지"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              "👤"
            )}
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="닉네임"
              className="w-full rounded-md border border-white bg-black px-4 py-3 text-white outline-none"
            />

            <input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              className="w-full rounded-md border border-white bg-black px-4 py-3 text-white outline-none"
            />

            <p className="text-sm text-gray-300">{user.email}</p>

            <button
              type="button"
              onClick={handleUpdateProfile}
              disabled={updateProfileMutation.isPending}
              className="mt-2 w-fit rounded-md bg-pink-500 px-5 py-2 text-sm text-white hover:bg-pink-600 disabled:bg-gray-500"
            >
              {updateProfileMutation.isPending ? "수정 중..." : "수정 완료"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPage;