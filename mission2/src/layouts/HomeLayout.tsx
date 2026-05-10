import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import FloatingButton from "../components/FloatingButton";

const HomeLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-dvh flex flex-col">
      <Navbar onMenuClick={() => setIsOpen(true)} />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />  
        <main className="flex-1 mt-10">
          <Outlet/>
        </main>
      </div>
      <Footer/>
      <FloatingButton />
    </div>
  );
};

export default HomeLayout;