import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import CreateLpModal from "../components/CreateLpModal";
import WithdrawModal from "../components/WithdrawModal";
import { useAuth } from "../context/AuthContext";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />

      <div className="flex">
        {isSidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={closeSidebar}
            aria-label="사이드바 닫기"
          />
        )}

        <aside
          className={`
            fixed left-0 top-0 z-40 h-screen w-64
            bg-zinc-950 border-r border-zinc-800 p-5
            transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:static md:h-[calc(100vh-64px)] md:translate-x-0
          `}
        >
          <div className="mt-16 flex flex-col gap-4 md:mt-0">
            <button
              type="button"
              onClick={() => {
                navigate("/");
                closeSidebar();
              }}
              className="text-left hover:text-pink-400"
            >
              🔍 찾기
            </button>

            <button
              type="button"
              onClick={() => {
                navigate("/mypage");
                closeSidebar();
              }}
              className="text-left hover:text-pink-400"
            >
              👤 마이페이지
            </button>
          </div>
            {isCreateModalOpen && (
      <CreateLpModal onClose={() => setIsCreateModalOpen(false)} />
    )}
    {isAuthenticated && (
        <div className="mt-200 border-t border-neutral-700 pt-4">
          <button
            type="button"
            onClick={() => setIsWithdrawModalOpen(true)}
            className="w-full rounded-md border border-red-500 px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white"
          >
            탈퇴하기
          </button>
        </div>
      )}

      {isWithdrawModalOpen && (
        <WithdrawModal onClose={() => setIsWithdrawModalOpen(false)} />
      )}
        </aside>

        <main className="min-h-[calc(100vh-64px)] flex-1 min-w-0 p-6">
          <Outlet />
        </main>
      </div>

      <button
        type="button"
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-3xl text-white shadow-lg hover:bg-pink-600"
        aria-label="LP 생성"
      >
        +
      </button>

    </div>
  );
};

export default RootLayout;