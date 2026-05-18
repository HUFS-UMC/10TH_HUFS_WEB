import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";
import useSidebar from "../hooks/useSidebar";

const HomeLayout = () => {
  const {
    isOpen,
    open,
    close,
  } = useSidebar();

  return (
    <div className="h-dvh flex flex-col">
      <Navbar onMenuClick={open} />

      <div className="flex flex-1">
        <Sidebar
          isOpen={isOpen}
          close={close}
        />

        <main className="flex-1 mt-10">
          <Outlet />
        </main>
      </div>

      <Footer />

      <FloatingButton />
    </div>
  );
};

export default HomeLayout;