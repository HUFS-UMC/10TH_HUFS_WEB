import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { localStorageKey } from "../constants/key";

const GoogleLoginRedirectPage = () => {

    const {setItem: setAccessToken} = useLocalStorage(localStorageKey.accessToken);
    const {setItem: setRefreshToken} = useLocalStorage(localStorageKey.refreshToken);

    useEffect( () => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get(localStorageKey.accessToken);
        const refreshToken = urlParams.get(localStorageKey.refreshToken);

        if(accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            window.location.href = '/my';
        }
    }, [setAccessToken, setRefreshToken]);
    return  <div>구글 로그인 리다이렉 화면</div>
};

export default GoogleLoginRedirectPage;