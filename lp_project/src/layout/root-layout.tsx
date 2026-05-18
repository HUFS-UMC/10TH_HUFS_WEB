import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CreateLpModal from "../components/CreateLpModal";
import WithdrawModal from "../components/WithdrawModal";
import {SearchModal} from "../components/SearchModal";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const openSidebar = ()=>{
      setIsSidebarOpen(true);
    };
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };
    const toggleSidebar=()=>{
      setIsSidebarOpen((prev)=>!prev);
    };

useEffect(() => {
  if (!isSidebarOpen) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  };
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isSidebarOpen]);

//배경 스크롤 방지.
//  사이드바 열리기 전 overflow backup 후 닫힐 때 원래 상태로.
useEffect(()=>{
  if(!isSidebarOpen) return;
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return ()=>{
    document.body.style.overflow = originalOverflow;
  }
},[isSidebarOpen]);


  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="flex">
        {isSidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/60"
            onClick={closeSidebar}
            aria-label="사이드바 닫기"
          />
        )}

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          onSearchClick={() => setIsSearchModalOpen(true)}
          onWithdrawClick={() => setIsWithdrawModalOpen(true)}
        />

        <main className="min-h-[calc(100vh-64px)] flex-1 min-w-0 p-6">
          <Outlet />
        </main>
      </div>

      {isSearchModalOpen && (
        <SearchModal 
        open={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)} />
      )}

      {isCreateModalOpen && (
        <CreateLpModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {isWithdrawModalOpen && (
        <WithdrawModal onClose={() => setIsWithdrawModalOpen(false)} />
      )}

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