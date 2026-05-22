import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Navbar from "../components/navbar";
import LpPostModal from "../components/LpPostModal";
import { api } from "../apis/axios";
import { useAuth } from "../context/AuthContext";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      console.log("사이드바 상태 변경됨:", !prev); // 이 글씨가 콘솔에 찍히는지 확인!
      return !prev;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isSidebarOpen]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();


  const { mutate: withdraw } = useMutation({
    mutationFn: () => api.delete("/users"),
    onSuccess: () => {
      localStorage.clear();
      setIsWithdrawModalOpen(false);
      logout();
      alert("탈퇴 처리가 완료되었습니다.");
      navigate("/login", { replace: true });
    },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="flex">
        {isSidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={closeSidebar}
          />
        )}
        
        <aside
        className={`
          fixed left-0 top-16 z-50 h-[calc(100vh-64px)] w-64
           bg-zinc-950 border-r border-zinc-800 p-5
           transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            >
          <div className="mt-16 flex flex-col gap-4 md:mt-0 h-full">
            <button
              type="button"
              onClick={() => { navigate("/"); closeSidebar(); }}
              className="text-left hover:text-pink-400"
            >
              🔍 찾기
            </button>

            <button
              type="button"
              onClick={() => { navigate("/my"); closeSidebar(); }}
              className="text-left hover:text-pink-400"
            >
              👤 마이페이지
            </button>

            <button
              type="button"
              onClick={() => setIsWithdrawModalOpen(true)}
              className="mt-auto text-left text-zinc-500 hover:text-red-400 text-sm pb-10"
            >
              탈퇴하기
            </button>
          </div>
        </aside>

        <main className="min-h-[calc(100vh-64px)] flex-1 min-w-0 p-6">
          <Outlet />
        </main>
      </div>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-3xl text-white shadow-lg transition-transform hover:bg-pink-600 hover:scale-110 active:scale-95"
      >
        +
      </button>

      <LpPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-sm rounded-3xl bg-zinc-900 p-10 text-center shadow-2xl">
            <button
              onClick={() => setIsWithdrawModalOpen(false)}
              className="absolute right-6 top-4 text-2xl text-zinc-500 hover:text-white"
            >
              ×
            </button>
            <p className="mb-8 mt-4 text-lg font-bold text-white">정말 탈퇴하시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => withdraw()}
                className="rounded-xl bg-zinc-300 px-8 py-3 font-bold text-black hover:bg-white transition-colors"
              >
                예
              </button>
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="rounded-xl bg-pink-500 px-8 py-3 font-bold text-white hover:bg-pink-600 transition-colors"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RootLayout;