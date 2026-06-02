import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
}

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복요청을 방지한다.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SETVER_API_URL,
  // headers: {
  //     'Content-Type': 'application/json',
  // }
});

// refresh 전용 인스턴스: 인터셉터를 타지 않게 분리한다.
const refreshAxios = axios.create({
  baseURL: import.meta.env.VITE_SETVER_API_URL,
});

const clearAuthAndRedirect = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
  localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
  window.location.href = "/login";
};

// 요청 인터셉터를 사용하여 모든 요청에 accessToken을 자동으로 포함시킨다.
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accesstoken = getItem(); // accessToken을 로컬 스토리지에서 가져온다.

    // accessToken이 존재하면 요청 헤더에 Authorization 필드의 bearer 형식으로 추가한다.
    if (accesstoken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accesstoken}`; // Authorization 헤더에 accessToken을 포함시킨다.
    }

    return config;
  },
  // 요청 에러가 발생하면 Promise.reject(error)를 반환하여 에러를 처리한다.
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 응답이 401 Unauthorized인 경우, accessToken이 만료되었을 가능성이 있으므로 refreshToken을 사용하여 새로운 accessToken을 발급받는다.
axiosInstance.interceptors.response.use(
  (response) => response, // 응답이 성공적인 경우 그대로 반환한다.
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig | undefined =
      error.config; // 에러가 발생한 요청의 설정을 가져온다.

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url ?? "";
    const isRefreshRequest = requestUrl.includes("/v1/auth/refresh");

    // 응답이 401 Unauthorized이고, 요청이 재시도되지 않았으며, refreshPromise가 존재하지 않는 경우에만 토큰을 갱신한다.
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      //refresh 엔드포인트 401, 중복 재시도 방지를 위해 로그아웃
      if (isRefreshRequest) {
        clearAuthAndRedirect(); // 로그인 페이지로 리디렉션
        return Promise.reject(error);
      }
      originalRequest._retry = true; // 요청이 재시도되었음을 표시한다.

      // 이미 refresh 요청이 진행 중인 경우, 기존 refreshPromise를 반환하여 중복 요청을 방지한다.
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken,
          );
          const refreshToken = getRefreshToken(); // refreshToken을 로컬 스토리지에서 가져온다.

          if (!refreshToken) {
            throw new Error("No refresh token");
          }

          const { data } = await refreshAxios.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken,
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken,
          );
          setAccessToken(data.data.accessToken); // 새로운 accessToken을 로컬 스토리지에 저장한다.
          setRefreshToken(data.data.refreshToken); // 새로운 refreshToken을 로컬 스토리지에 저장한다.

          return data.data.accessToken; // 새로운 accessToken을 반환한다.
        })()
          .catch((err) => {
            const status = err?.response?.status;

            // refresh 토큰 자체가 유효하지 않을 때만 세션을 종료한다.
            if (status === 401 || status === 403) {
              clearAuthAndRedirect(); // 로그인 페이지로 리디렉션
            }
            return Promise.reject(err);
          })
          .finally(() => {
            refreshPromise = null; // refresh 요청이 완료되면 refreshPromise를 초기화하여 다음 요청에서 새로 생성할 수 있도록 한다.
          });
      }
      return refreshPromise.then((newAccessToken) => {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance.request(originalRequest); // 원래 요청을 새로운 accessToken으로 재시도한다.
      });
    }
    return Promise.reject(error); // 401이 아닌 다른 에러는 그대로 반환하여 에러를 처리한다.
  },
);
