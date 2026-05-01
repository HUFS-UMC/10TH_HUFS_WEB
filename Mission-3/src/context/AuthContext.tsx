import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postSignin, postLogout } from '../apis/auth';
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface AuthContextType {
	accessToken: string | null;
	refreshToken: string | null;
	login: (signinData: RequestSigninDto) => Promise<void>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
	accessToken: null,
	refreshToken: null,
	login: async () => {},
	logout: async () => {},
})

export const AuthProvider  = ({children}:PropsWithChildren ) => {


	const {
		getItem: getAccessTokenFromStorage,
		setItem: setAccessTokenInStorage,
		removeItem: removeAccessTokenFromStorage} = useLocalStorage(
		LOCAL_STORAGE_KEY.accessToken
	);
	const {
		getItem: getRefreshTokenFromStorage,
		setItem: setRefreshTokenInStorage,
		removeItem: removeRefreshTokenFromStorage} = useLocalStorage(
		LOCAL_STORAGE_KEY.refreshToken
	);

	const [accessToken, setAccessToken] = useState<string | null>(
		getAccessTokenFromStorage() //지연 초기화
	); 
	const [refreshToken, setRefreshToken] = useState<string | null>(
		getRefreshTokenFromStorage() //지연 초기화
	);

	const login = async (signinData: RequestSigninDto) => {
		try{
			console.log("로그인 시도 데이터:", signinData);
			const {data} = await postSignin(signinData);

			if (data) {
				const newAccessToken = data.accessToken;
				const newRefreshToken = data.refreshToken;
				
				setAccessTokenInStorage(newAccessToken);
				setRefreshTokenInStorage(newRefreshToken);
				setAccessToken(newAccessToken);
				setRefreshToken(newRefreshToken);
				console.log("Login successful:", data);
				window.location.href	= '/my';
			}
		} catch (error) {
					console.error("Login failed:", error);
					alert("로그인에 실패했습니다. 다시 시도해주세요.");
		}
	}

	const logout = async() => {
		try {
			await postLogout();
			removeAccessTokenFromStorage();
			removeRefreshTokenFromStorage();
			setAccessToken(null);
			setRefreshToken(null);
			alert("로그아웃 되었습니다.");
			window.location.href	= '/';
		} catch (error) {
			console.error("Logout failed:", error);
			alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
		}
	}
	return (
		<AuthContext.Provider value={{accessToken, refreshToken, login, logout}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if		(!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}