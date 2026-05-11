import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  saveAccessToken: (token: string) => void;
  saveUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("accessToken");
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const saveAccessToken = (token: string) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const saveUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");

    setAccessToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(accessToken);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated,
        saveAccessToken,
        saveUser,
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
    throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  }

  return context;
};