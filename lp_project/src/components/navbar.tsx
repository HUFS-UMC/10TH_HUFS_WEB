import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userName");
    localStorage.removeItem("refreshToken");
    navigate("/", { replace: true });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-black px-5 text-white">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="text-white"
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

        <NavLink to="/" className="text-2xl font-bold text-pink-500">
          돌려돌려LP판
        </NavLink>
      </div>

      <div className="flex items-center gap-4">
        <button type="button" className="text-xl" aria-label="검색">
          🔍
        </button>

        {isAuthenticated ? (
          <>
            <span className="text-sm">
              {userName ? `${userName}님 반갑습니다.` : "반갑습니다."}
            </span>

            <button type="button" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">로그인</NavLink>

            <NavLink
              to="/signup"
              className="rounded-md bg-pink-500 px-3 py-2 text-white"
            >
              회원가입
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;