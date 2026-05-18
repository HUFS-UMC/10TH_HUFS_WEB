import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import type { RequestSigninDto } from "../types/auth.ts";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  login: (data: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem(LOCAL_STORAGE_KEY.accessToken),
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken),
  );

  const setTokens = (newAccessToken: string, newRefreshToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, newAccessToken);
    localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, newRefreshToken);

    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
  };

  const login = async (_data: RequestSigninDto) => {
    /**
     * 로그인 로직은 이제 LoginPage의 useMutation에서 처리함.
     * 기존 코드와의 호환을 위해 함수 형태만 남겨둠.
     */
  };

  const logout = async () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
    localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setTokens,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서 사용해야 합니다.");
  }

  return context;
};