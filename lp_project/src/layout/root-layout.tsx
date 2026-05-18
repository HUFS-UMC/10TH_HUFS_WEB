import { useState } from "react";
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