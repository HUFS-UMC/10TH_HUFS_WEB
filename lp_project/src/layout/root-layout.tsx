import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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
                navigate("/my");
                closeSidebar();
              }}
              className="text-left hover:text-pink-400"
            >
              👤 마이페이지
            </button>
          </div>
        </aside>

        <main className="min-h-[calc(100vh-64px)] flex-1 min-w-0 p-6">
          <Outlet />
        </main>
      </div>

      <button
        type="button"
        onClick={() => navigate("/lp/create")}
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-3xl text-white shadow-lg hover:bg-pink-600"
        aria-label="LP 생성"
      >
        +
      </button>
    </div>
  );
};

export default RootLayout;