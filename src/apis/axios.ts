import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

interface CustomInteralAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?:boolean;
}


let refreshPromise:Promise<string> | null = null;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});


axiosInstance.interceptors.request.use((config) => {
  const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const accessToken = getItem();                                  


  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  
  return config;
},
  
  (error) => Promise.reject(error),
);


axiosInstance.interceptors.response.use(
  (response) => response,                            
  async(error) => {
    const originalRequest:CustomInteralAxiosRequestConfig = error.config;

    // 401에러면서,아직 재시도 하지 않은 경우
    if (
      error.response &&
      error.response.status===401 &&
      !originalRequest._retry
    ) {
    // refresh 엔드포인트 401 에러인 경우
      if (originalRequest.url === "/v1/auth/refresh") {
        const {removeItem:removeAccessToken} = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken,
        );
        const {removeItem:removeRefreshToken} = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken,
        );
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login"; 
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry=true;

     // 이미 리프레시 요정이 진행중이면, 그 Promise를 재사용함
      if (!refreshPromise) {
   
        refreshPromise = (async() => {
          const {getItem:getRefreshToken} = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken,
          );
          const refreshToken = getRefreshToken();

    
          const {data} = await axiosInstance.post("/v1/auth/refresh",{
            refresh:refreshToken,
          });
          
          const {setItem:setAccessToken} = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken,
          );
          const {setItem:setRefreshToken} = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken,
          );
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

      
          return data.data.accessToken;
        })()
        .catch((error) => {
          const {removeItem:removeAccessToken} = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken,
          );
          const {removeItem:removeRefreshToken} = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken,
          );
          removeAccessToken()
          removeRefreshToken()
          
          throw error
        })
        .finally(() => {
          refreshPromise = null;
        });
      }

  
      return refreshPromise?.then((newAccessToken) => {
       
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
   
        return axiosInstance.request(originalRequest);
      });
    }

    return Promise.reject(error);
  },
)