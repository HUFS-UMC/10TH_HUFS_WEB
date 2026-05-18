import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.tsx";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");

      navigate("/login", {
        replace: true,
        state: {
          from: location,
        },
      });
    }
  }, [accessToken, location, navigate]);

  if (!accessToken) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedLayout;