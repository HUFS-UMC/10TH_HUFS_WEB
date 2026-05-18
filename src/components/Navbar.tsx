import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMyInfo } from "../apis/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { QUERY_KEY } from "../constants/key.ts";
import useLogout from "../hooks/mutations/useLogout.ts";
import HamburgerIcon from "./icons/HamburgerIcon.tsx";

interface NavbarProps {
  onClickMenu: () => void;
}

const Navbar = ({ onClickMenu }: NavbarProps) => {
  const { accessToken } = useAuth();

  const { mutate: logoutMutate, isPending: isLogoutPending } = useLogout();

  const { data: myInfo } = useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });

  const handleLogout = () => {
    logoutMutate();
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
            <HamburgerIcon />
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
                disabled={isLogoutPending}
                className="text-gray-200 hover:text-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLogoutPending ? "로그아웃 중..." : "로그아웃"}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;