import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import FloatingButton from "../components/FloatingButton.tsx";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-dvh bg-[#020617] text-white">
      <Navbar onClickMenu={handleOpenSidebar} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 top-16 z-10 bg-black/60 md:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      <main className="min-h-dvh pt-16 md:pl-52">
        <Outlet />
      </main>

      <FloatingButton />
    </div>
  );
};

export default HomeLayout;