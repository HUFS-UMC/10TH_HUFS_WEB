import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLoginMutation } from "../hooks/mutations/useLogin";
import { useLogoutMutation } from "../hooks/mutations/useLogout";

/* ---------------- 타입 ---------------- */

interface User {
  nickname: string;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

/* ---------------- Context ---------------- */

export const AuthContext = createContext<AuthContextType | null>(null);

/* ---------------- Provider ---------------- */

export const AuthProvider = ({ children }: PropsWithChildren) => {
  /* 🔥 localStorage 훅 */
  const {
    getItem: getAccessToken,
    setItem: setAccessTokenStorage,
    removeItem: removeAccessToken,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshToken,
    setItem: setRefreshTokenStorage,
    removeItem: removeRefreshToken,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const {
    getItem: getUser,
    setItem: setUserStorage,
    removeItem: removeUser,
  } = useLocalStorage("user");

  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  /* ---------------- state ---------------- */

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessToken()
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshToken()
  );

  const [user, setUser] = useState<User | null>(getUser());

  /* ---------------- login ---------------- */

  const login = async (signinData: RequestSigninDto) => {
    try {
      const res = await loginMutation.mutateAsync(signinData);

      if (res.data) {
        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        setAccessTokenStorage(newAccessToken);
        setRefreshTokenStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        const newUser: User = {
          nickname: res.data.name,
        };

        setUser(newUser);
        setUserStorage(newUser);

        alert("로그인 성공");
        window.location.href = "/my";
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  /* ---------------- logout ---------------- */

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();

      removeAccessToken();
      removeRefreshToken();
      removeUser();

      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);

      alert("로그아웃 성공");
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  /* ---------------- context value ---------------- */

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ---------------- hook ---------------- */

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
};