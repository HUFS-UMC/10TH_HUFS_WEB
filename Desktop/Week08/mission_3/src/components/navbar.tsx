import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { api } from "../apis/axios";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  useEffect(() => {
    const handleNameChange = () => {
      setUserName(localStorage.getItem("userName"));
    };

    window.addEventListener("nicknameChanged", handleNameChange);

    return () => {
      window.removeEventListener("nicknameChanged", handleNameChange);
    };
  }, []);

  const { mutate: handleLogoutMutation } = useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onSuccess: () => {
      logout();
      localStorage.removeItem("userName");
      localStorage.removeItem("refreshToken");
      queryClient.clear(); 
      
      alert("로그아웃 되었습니다. 💿");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 문제가 발생했습니다.");
    }
  });

  // ... 상단 import 및 로직 생략 (기존 코드 그대로 유지!)

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-black px-5 text-white">
      <div className="flex items-center gap-4">
  {/* 💡 md:hidden을 지워서 큰 화면에서도 버튼이 항상 보이도록 설정! */}
  <button type="button" onClick={onToggleSidebar} className="text-white">
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/>
      </svg>
    </button>
  <NavLink to="/" className="text-2xl font-bold text-pink-500">돌려돌려LP판</NavLink>
  </div>

      <div className="flex items-center gap-4">
        <button type="button" className="text-xl">🔍</button>

        {isAuthenticated ? (
          <>
            <span className="text-sm">
              {userName ? `${userName}님 반갑습니다.` : "반갑습니다."}
            </span>
            <button type="button" onClick={() => handleLogoutMutation()}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">로그인</NavLink>
            <NavLink to="/signup" className="rounded-md bg-pink-500 px-3 py-2 text-white">
              회원가입
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;