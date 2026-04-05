import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <header className="flex justify-between items-center p-5 border-b border-slate-100 bg-white sticky top-0 z-50">
        <h1 className="text-blue-600 font-extrabold text-xl tracking-tight cursor-pointer">
          선아의 홈페이지
        </h1>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">로그인</button>
          <button className="px-4 py-1.5 text-sm bg-blue-600 rounded-full text-white font-semibold shadow-sm hover:bg-blue-700 transition-all">회원가입</button>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="p-10 bg-slate-50 text-center text-slate-400 text-sm">
        © 2026 선아의 홈페이지. All rights reserved.
      </footer>
    </div>
  );
};

export default HomeLayout;