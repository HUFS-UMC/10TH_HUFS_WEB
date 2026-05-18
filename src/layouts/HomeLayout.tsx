import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import FloatingButton from "../components/FloatingButton.tsx";
import LpCreateModal from "../components/LpCreateModal.tsx";
import useSidebar from "../hooks/useSidebar.ts";

const HomeLayout = () => {
  const { isOpen, toggle, close } = useSidebar();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-dvh bg-[#020617] text-white">
      <Navbar isSidebarOpen={isOpen} onClickMenu={toggle} />

      <Sidebar isOpen={isOpen} onClose={close} />

      <main className="min-h-dvh pt-16">
        <Outlet />
      </main>

      <FloatingButton onClick={handleOpenCreateModal} />

      {isCreateModalOpen && (
        <LpCreateModal onClose={handleCloseCreateModal} />
      )}
    </div>
  );
};

export default HomeLayout;