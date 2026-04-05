import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "../hooks/useLocalStorage";

const schema = z
  .object({
    email: z.string().email("올바른 이메일 형식을 입력해주세요."),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    confirmPassword: z.string(),
    nickname: z.string().min(1, "닉네임을 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

type User = {
  email: string;
  nickname: string;
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword] = useState(false);

  const [, setUser] = useLocalStorage<User | null>("user", null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");

  const handleNextEmail = async () => {
    const valid = await trigger("email");
    if (valid) setStep(2);
  };

  const handleNextPassword = async () => {
    const valid = await trigger(["password", "confirmPassword"]);
    if (valid) setStep(3);
  };

  const onSubmit = (data: FormData) => {
    setUser({
      email: data.email,
      nickname: data.nickname,
    });

    alert("회원가입 완료!");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-dvh bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-xl w-80"
      >
        <div className="flex items-center mb-6">
          <button
            type="button"
            onClick={() => (step === 1 ? navigate(-1) : setStep(step - 1))}
            className="text-white text-2xl mr-3"
          >
            {"<"}
          </button>
          <h2 className="text-white text-2xl font-bold">회원가입</h2>
        </div>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="이메일"
              {...register("email")}
              className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mb-2">
                {errors.email.message}
              </p>
            )}

            <button
              type="button"
              onClick={handleNextEmail}
              className={`w-full py-2 rounded text-white ${
                email && !errors.email ? "bg-red-500" : "bg-gray-500"
              }`}
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-gray-300 mb-2 text-sm">{email}</p>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                {...register("password")}
                className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 확인"
              {...register("confirmPassword")}
              className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
            )}

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mb-2">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              type="button"
              onClick={handleNextPassword}
              className={`w-full py-2 rounded text-white ${
                password &&
                watch("confirmPassword") &&
                password === watch("confirmPassword") &&
                !errors.password &&
                !errors.confirmPassword
                  ? "bg-red-500"
                  : "bg-gray-500"
              }`}
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-white">
                +
              </div>
            </div>

            <input
              type="text"
              placeholder="닉네임"
              {...register("nickname")}
              className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
            />

            {errors.nickname && (
              <p className="text-red-500 text-sm mb-2">
                {errors.nickname.message}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-2 rounded text-white ${
                isValid ? "bg-red-500" : "bg-gray-500"
              }`}
            >
              회원가입 완료
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignupPage;