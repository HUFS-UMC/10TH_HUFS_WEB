import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="flex gap-4 p-4">
      <NavLink to="/">홈</NavLink>
      <NavLink to="/movies/popular">인기 영화</NavLink>
      <NavLink to="/movies/now_playing">상영 중</NavLink>
      <NavLink to="/movies/top_rated">평점 높은</NavLink>
      <NavLink to="/movies/upcoming">개봉 예정</NavLink>

      {isAuthenticated ? (
        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
      ) : (
        <>
          <NavLink to="/login">로그인</NavLink>
          <NavLink to="/signup">회원가입</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;