import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useLocalStorage from "../hooks/useLocalStorage";

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .email("올바른 이메일 형식을 입력해주세요."),
    password: z
      .string()
      .min(6, "비밀번호는 6자 이상이어야 합니다."),
    passwordConfirm: z
      .string()
      .min(1, "비밀번호 확인을 입력해주세요."),
    nickname: z
      .string()
      .min(2, "닉네임은 2자 이상이어야 합니다."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [, setSignupEmail] = useLocalStorage<string>("signup-email", "");

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passwordConfirmValue = watch("passwordConfirm");
  const nicknameValue = watch("nickname");

  const isStep1Valid = emailValue.includes("@");
  const isStep2Valid =
    passwordValue.length >= 6 &&
    passwordConfirmValue.length > 0 &&
    passwordValue === passwordConfirmValue;
  const isStep3Valid = nicknameValue.trim().length >= 2;

  const handleNext = async () => {
    const isEmailValid = await trigger("email");
    if (!isEmailValid) return;
    setStep(2);
  };

  const handlePasswordNext = async () => {
    const isPasswordValid = await trigger(["password", "passwordConfirm"]);
    if (!isPasswordValid) return;
    setStep(3);
  };

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      console.log(data);
      setSignupEmail(data.email);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8">
        <div className="relative flex items-center justify-center mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-0 text-white text-3xl leading-none px-2 hover:text-[#dda5e3] transition-colors"
          >
            {"<"}
          </button>

          <h1 className="text-white text-3xl font-bold">회원가입</h1>
        </div>

        <button
          type="button"
          className="w-full border border-zinc-600 text-white py-3 rounded-lg font-medium hover:border-[#dda5e3] transition-all duration-200 mb-4"
        >
          구글 로그인
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-zinc-700" />
          <span className="text-zinc-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-zinc-700" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          {step === 1 && (
            <>
              <input
                type="text"
                placeholder="이메일을 입력해주세요!"
                {...register("email")}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-[#dda5e3]"
              />

              {errors.email && (
                <p className="text-red-500 text-sm -mt-2">
                  {errors.email.message}
                </p>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={!isStep1Valid}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isStep1Valid
                    ? "bg-[#dda5e3] text-white hover:bg-[#c98bd1] cursor-pointer"
                    : "bg-gray-500 text-gray-200 cursor-not-allowed"
                }`}
              >
                다음
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-zinc-300 text-sm mb-1">입력한 이메일</p>
              <div className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700">
                {emailValue}
              </div>

              <input
                type="password"
                placeholder="비밀번호를 입력해주세요!"
                {...register("password")}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-[#dda5e3]"
              />

              {errors.password && (
                <p className="text-red-500 text-sm -mt-2">
                  {errors.password.message}
                </p>
              )}

              <input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요!"
                {...register("passwordConfirm")}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-[#dda5e3]"
              />

              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm -mt-2">
                  {errors.passwordConfirm.message}
                </p>
              )}

              <button
                type="button"
                onClick={handlePasswordNext}
                disabled={!isStep2Valid}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isStep2Valid
                    ? "bg-[#dda5e3] text-white hover:bg-[#c98bd1] cursor-pointer"
                    : "bg-gray-500 text-gray-200 cursor-not-allowed"
                }`}
              >
                다음
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex flex-col items-center gap-4 mb-2">
                <div className="w-28 h-28 rounded-full bg-zinc-300 flex items-center justify-center overflow-hidden">
                  <span className="text-5xl text-zinc-500">👤</span>
                </div>
              </div>

              <input
                type="text"
                placeholder="닉네임을 입력해주세요!"
                {...register("nickname")}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-[#dda5e3]"
              />

              {errors.nickname && (
                <p className="text-red-500 text-sm -mt-2">
                  {errors.nickname.message}
                </p>
              )}

              <button
                type="submit"
                disabled={!isStep3Valid || isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isStep3Valid && !isSubmitting
                    ? "bg-[#dda5e3] text-white hover:bg-[#c98bd1] cursor-pointer"
                    : "bg-gray-500 text-gray-200 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "가입 중..." : "회원가입 완료"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;