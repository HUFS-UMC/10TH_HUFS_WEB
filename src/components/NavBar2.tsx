import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
 
const NavBar2 = () => {
    const { accessToken } = useAuth();
    // AuthContext에서 nickname 노출 시: const { accessToken, nickname } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
 
    return (
        <>
            {/* ── HEADER ── */}
            <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 gap-3 bg-[#111] border-b border-[#222]">
 
                {/* 버거 버튼 */}
                <button
                    onClick={() => setSidebarOpen((v) => !v)}
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded"
                    aria-label="메뉴 열기"
                >
                    <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"
                            d="M7.95 11.95h32m-32 12h32m-32 12h32" />
                    </svg>
                </button>
 
                {/* 로고 */}
                <Link to="/" className="flex-1 text-xl font-black tracking-tight text-[#ff2d78]">
                    돌려돌려LP판
                </Link>
 
                {/* 검색 */}
                <button className="text-gray-400 hover:text-white transition-colors" aria-label="검색">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="22" y2="22" />
                    </svg>
                </button>
 
                {/* 비로그인 */}
                {!accessToken && (
                    <div className="flex items-center gap-2">
                        <Link
                            to="login"
                            className="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded border border-[#333] transition-colors"
                        >
                            로그인
                        </Link>
                        <Link
                            to="signup"
                            className="text-sm font-bold text-white px-3 py-1.5 rounded bg-[#ff2d78] hover:bg-[#e0245f] transition-colors"
                        >
                            회원가입
                        </Link>
                    </div>
                )}
 
                {/* 로그인 상태 */}
                {accessToken && (
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">
                            {/* nickname 연동 시 교체: {nickname}님 반갑습니다. */}
                            님 반갑습니다.
                        </span>
                        <button
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                            onClick={() => {/* logout() 연결 */}}
                        >
                            로그아웃
                        </button>
                    </div>
                )}
            </nav>
 
            {/* ── 사이드바 오버레이 ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
 
            {/* ── SIDEBAR ── */}
            <aside
                className={`fixed top-14 left-0 bottom-0 z-50 w-44 flex flex-col py-5 bg-[#111] border-r border-[#222] transition-transform duration-300 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <Link
                    to="/"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-[#ff2d78] hover:bg-[#1a1a1a] transition-colors"
                >
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="22" y2="22" />
                    </svg>
                    찾기
                </Link>
 
                {accessToken && (
                    <Link
                        to="/my"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
                    >
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        마이페이지
                    </Link>
                )}
            </aside>
        </>
    );
};
 
export default NavBar2;