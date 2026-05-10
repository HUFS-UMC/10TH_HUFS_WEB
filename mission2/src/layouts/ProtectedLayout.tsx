import {Outlet, useLocation, useNavigate,} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  /* ---------------- 모달 대신 confirm ---------------- */
  useEffect(() => {
    if (!accessToken && !checkedAuth) {
      const ok = window.confirm(
        "로그인이 필요한 페이지입니다. 로그인 하시겠습니까?"
      );

      if (ok) {
        navigate("/login", {
          state: { from: location },
          replace: true,
        });
      }

      setCheckedAuth(true);
    }
  }, [accessToken, checkedAuth, navigate, location]);

  if (!accessToken) {
    return null; // flicker 방지
  }

  return (
    <div className="h-dvh flex flex-col">
      <Navbar onMenuClick={() => setIsOpen(true)} />

      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="flex-1 mt-10">
          <Outlet />
        </main>
      </div>

      <Footer />
      <FloatingButton />
    </div>
  );
};

export default ProtectedLayout;