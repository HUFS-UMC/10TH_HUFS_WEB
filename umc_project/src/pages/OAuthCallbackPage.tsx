import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const { saveAccessToken } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) {
      return;
    }

    hasProcessed.current = true;

    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const userId = params.get("userId");
    const name = params.get("name");

    if (!accessToken) {
      alert("구글 로그인 처리에 실패했습니다.");
      navigate("/login", { replace: true });
      return;
    }

    saveAccessToken(accessToken);

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    if (userId) {
      localStorage.setItem("userId", userId);
    }

    if (name) {
      localStorage.setItem("userName", name);
    }

    navigate("/", { replace: true });
  }, [navigate, saveAccessToken]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      구글 로그인 처리 중...
    </div>
  );
};

export default OAuthCallbackPage;