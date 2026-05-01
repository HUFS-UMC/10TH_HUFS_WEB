import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const navigate = useNavigate();

  const { accessToken } = useAuth();
  if (!accessToken) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="min-h-screen flex flex-col bg-[#0b0b12] text-white">
      <nav className="border-b border-white/10 bg-black/30 px-6 py-4 backdrop-blur-sm">
        내브바
        <button onClick={() => navigate('/my')} className="absolute top-4 right-25 rounded-lg bg-[#807bff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.98]">
        My Page
        </button>
        <button onClick={() => navigate('/login')} className="absolute top-4 right-50 rounded-lg bg-[#807bff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.98]">
          Login
        </button>
        <button onClick={() => navigate('/signup')} className="absolute top-4 right-70 rounded-lg bg-[#807bff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.98]">
          Signup
        </button>
        <button onClick={() => navigate('/')} className="absolute top-4 right-93 rounded-lg bg-[#807bff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.98]">
          Home
        </button>
      </nav>
      <main className='flex-1'>
        <Outlet />
      </main>
      <footer className="border-t border-white/10 bg-black/30 px-6 py-4 text-sm text-white/60">
        푸터
      </footer>
    </div>
	)
};

export default ProtectedLayout
