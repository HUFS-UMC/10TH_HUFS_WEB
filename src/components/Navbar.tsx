import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMyInfo } from "../apis/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { QUERY_KEY } from "../constants/key.ts";
import useLogout from "../hooks/mutations/useLogout.ts";
import HamburgerButton from "./HamburgerButton.tsx";

interface NavbarProps {
  isSidebarOpen: boolean;
  onClickMenu: () => void;
}

const Navbar = ({ isSidebarOpen, onClickMenu }: NavbarProps) => {
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
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-gray-800 bg-[#111827]">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <HamburgerButton isOpen={isSidebarOpen} onClick={onClickMenu} />

          <Link to="/" className="text-2xl font-bold text-pink-500">
            돌려돌려LP판
          </Link>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <button
            type="button"
            className="text-gray-300 transition-colors hover:text-white"
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
                className="rounded-md bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-600"
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
                className="text-gray-200 transition-colors hover:text-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
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