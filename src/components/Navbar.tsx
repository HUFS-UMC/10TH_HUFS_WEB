import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMyInfo } from "../apis/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";

interface NavbarProps {
  onClickMenu: () => void;
}

const Navbar = ({ onClickMenu }: NavbarProps) => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();

  const { data: myInfo } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-[#111827] border-b border-gray-800">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClickMenu}
            className="text-gray-300 hover:text-white"
            aria-label="사이드바 열기"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>

          <Link to="/" className="text-2xl font-bold text-pink-500">
            돌려돌려LP판
          </Link>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <button
            type="button"
            className="text-gray-300 hover:text-white"
            aria-label="검색"
          >
            🔍
          </button>

          {!accessToken ? (
            <>
              <Link to="/login" className="text-gray-200 hover:text-pink-400">
                로그인
              </Link>

              <Link
                to="/signup"
                className="bg-pink-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-pink-600"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-200">
                {myInfo?.data?.name ?? "회원"}님 반갑습니다.
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="text-gray-200 hover:text-pink-400"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;