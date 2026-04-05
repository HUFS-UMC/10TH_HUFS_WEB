import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: '홈', path: '/' },
    { name: '인기 영화', path: '/movies/popular' },
    { name: '상영 중', path: '/movies/now_playing' },
    { name: '평점 높은', path: '/movies/top_rated' },
    { name: '개봉 예정', path: '/movies/upcoming' },
  ];

  return (
    <nav className="flex gap-6 p-4 text-sm font-medium border-b border-gray-200 bg-white sticky top-0 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "text-green-600 font-bold" : "text-gray-500 hover:text-gray-800"
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};
export default Navbar;