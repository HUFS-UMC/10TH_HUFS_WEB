import { useState } from "react";
import { Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import EditProfileModal from "../components/EditProfileModal";

const MyPage = () => {
  const { accessToken, logout } = useAuth();
  const { data, isPending } = useGetMyInfo(accessToken);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const user = data?.data;

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(128,123,255,0.18),_transparent_45%),linear-gradient(180deg,_#0b0b12_0%,_#08080d_100%)] px-4 py-10">
      <div className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center shadow-2xl shadow-black/40 backdrop-blur-md">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/45">
          My Page
        </p>

        {isPending ? (
          <div className="mt-6 flex flex-col items-center gap-3 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-white/10" />
            <div className="h-5 w-32 rounded bg-white/10" />
            <div className="h-4 w-48 rounded bg-white/10" />
          </div>
        ) : (
          <>
            {/* 아바타 + 설정 버튼 */}
            <div className="mt-6 flex flex-col items-center gap-3 relative">
              <div className="relative">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#f472b6] flex items-center justify-center text-white text-3xl font-bold border-2 border-white/20">
                    {user?.name?.[0] ?? "?"}
                  </div>
                )}
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#807bff] flex items-center justify-center hover:bg-[#6b63d9] transition shadow-lg"
                  title="프로필 설정"
                >
                  <Settings className="w-3.5 h-3.5 text-white" />
                </button>
              </div>

              <h1 className="text-2xl font-bold text-white">{user?.name}</h1>

              {user?.bio && (
                <p className="text-sm text-white/60 leading-6">{user.bio}</p>
              )}

              <p className="text-xs text-white/35">{user?.email}</p>
            </div>

            {/* 로그아웃 버튼 */}
            <button
              onClick={logout}
              className="mt-8 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 hover:border-white/25"
            >
              로그아웃
            </button>
          </>
        )}
      </div>

      {isEditModalOpen && user && (
        <EditProfileModal
          initialName={user.name}
          initialBio={user.bio}
          initialAvatar={user.avatar}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyPage;
