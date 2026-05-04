import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      // 1. 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 2. 중요! 페이지를 아예 새로고침하면서 메인으로 보내버리기
      // 이렇게 해야 axiosInstance나 App.tsx에서 새 토큰을 바로 읽어와!
      window.location.href = "/"; 
    } else {
      alert("로그인 정보를 가져오지 못했습니다.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>로그인 처리 중...</p>
    </div>
  );
};

export default GoogleCallbackPage;