import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <div>네비게이션 바 입니다.</div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;