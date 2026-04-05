import { Outlet, Link } from "react-router-dom"; // 🔥 Link 추가

const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col">
            <nav className="flex justify-between items-center p-4 bg-black text-white">
                <Link to="/">홈</Link>

                <div className="flex gap-4">
                    <Link to="/login">로그인</Link> {/* 🔥 추가 */}
                    <Link to="/signup">회원가입</Link> {/* 🔥 선택 */}
                </div>
            </nav>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="flex justify-between items-center p-4 bg-black text-white">풋터</footer>
        </div>
    );
};

export default HomeLayout;