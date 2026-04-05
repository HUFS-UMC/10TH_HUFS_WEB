import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <div>네비게이션 바 입니다.</div>

      {/* ⭐ 여기 필수 */}
      <Outlet />
    </div>
  );
};

export default HomeLayout;