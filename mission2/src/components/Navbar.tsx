import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: Props) => {
  const { accessToken } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">

        {/* 왼쪽 영역 (버거 + 로고) */}
        <div className="flex items-center space-x-3">
          {/* ✅ 버거 버튼 */}
          <button
            onClick={onMenuClick}
            className="text-2xl"
          >
            ☰
          </button>

          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            SpinningSpinning Dolimpan
          </Link>
        </div>

        {/* 오른쪽 메뉴 */}
        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                회원가입
              </Link>
            </>
          )}

          {accessToken && (
            <Link
              to="/my"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              마이페이지
            </Link>
          )}

          <Link
            to="/search"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            검색페이지
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;