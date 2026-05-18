import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useForm from "../hooks/useForm.ts";
import useLogin from "../hooks/mutations/useLogin.ts";
import type { UserSigninInformation } from "../utils/validate.ts";
import { validateSignin } from "../utils/validate.ts";
import { useAuth } from "../context/AuthContext.tsx";

const LoginPage = () => {
  const { accessToken, setTokens } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { mutate: loginMutate, isPending } = useLogin();

  useEffect(() => {
    if (accessToken) {
      navigate(from, { replace: true });
    }
  }, [navigate, accessToken, from]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = () => {
    loginMutate(values, {
      onSuccess: (response) => {
        console.log("로그인 응답:", response);

        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);

        if (!accessToken || !refreshToken) {
          alert("로그인 응답에 토큰이 없습니다.");
          return;
        }

        setTokens(accessToken, refreshToken);

        navigate(from, { replace: true });
      },

      onError: (error) => {
        console.error("로그인 실패:", error);
        alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      },
    });
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled: boolean =
    isPending ||
    Object.values(errors).some((error: string) => error.length > 0) ||
    Object.values(values).some((value: string) => value === "");

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-4 bg-[#020617] text-white">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`w-[300px] rounded-sm border p-[10px] text-black focus:border-[#807bff] ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일"
        />

        {errors?.email && touched?.email && (
          <div className="text-sm text-red-500">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          name="password"
          className={`w-[300px] rounded-sm border p-[10px] text-black focus:border-[#807bff] ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호"
        />

        {errors?.password && touched?.password && (
          <div className="text-sm text-red-500">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full cursor-pointer rounded-md bg-pink-500 py-3 text-lg font-medium text-white transition-colors hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full cursor-pointer rounded-md border border-gray-300 bg-white py-3 text-lg font-medium text-black transition-colors hover:bg-gray-100"
        >
          <div className="flex items-center justify-center gap-4">
            <img
              src="/images/google.svg"
              alt="Google Logo Image"
              className="h-6 w-6"
            />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;