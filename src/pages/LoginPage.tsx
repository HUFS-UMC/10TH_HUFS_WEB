import useForm from "../hooks/useForm";
import type { UserSigninInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { ResponseSigninDto } from "../types/auth";

const LoginPage = () => {
  const { setItem } = useLocalStorage("accessToken");

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    try {
      const response: ResponseSigninDto = await postSignin(values);
      setItem(response.data.accessToken);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h1 className="text-2xl font-bold">로그인</h1>

      <div className="flex flex-col gap-3">
        {/* 이메일 */}
        <input
          {...getInputProps("email")}
          placeholder="이메일"
          className="border p-2 w-[300px]"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}

        {/* 비밀번호 */}
        <input
          {...getInputProps("password")}
          type="password"
          placeholder="비밀번호"
          className="border p-2 w-[300px]"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        {/* 버튼 */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 rounded"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;