import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();
    const location = useLocation();
    const [modalDismissed, setModalDismissed] = useState(false);

    // 로그인 상태 → 정상 렌더
    if (accessToken) {
        return (
            <div className="h-dvh flex flex-col bg-[#0f0f0f]">
                <NavBar2 />
                <main className="flex-1 mt-14">
                    <Outlet />
                </main>
                <Footer />
            </div>
        );
    }

    // 모달 확인 후 → /login, state.from에 원래 경로 전달
    if (modalDismissed) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 비로그인 → 경고 모달
    return (
        <div className="fixed inset-0 z-[900] flex items-center justify-center bg-black/45">
            <div className="bg-white rounded-lg p-6 min-w-[300px] shadow-2xl flex flex-col gap-4">
                <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                        {window.location.host} 내용:
                    </p>
                    <p className="text-sm text-gray-700">
                        로그인이 필요한 서비스입니다. 로그인을 해주세요!
                    </p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => setModalDismissed(true)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm px-6 py-2 rounded-md transition-colors cursor-pointer"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProtectedLayout;