import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../utils/validate";
import type { SignupFormValues } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface User {
  email: string;
  nickname: string;
}

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  
  const [_, setUser] = useLocalStorage<User | null>("user_data", null);
  
  const navigate = useNavigate();

  const { register, handleSubmit, watch, trigger, formState: { errors, isValid } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const emailValue = watch("email");

  const handleNext = async (fields: (keyof SignupFormValues)[]) => {
    const isStepValid = await trigger(fields);
    if (isStepValid) setStep(step + 1);
  };

  const onSubmit = (data: SignupFormValues) => {
    setUser({ email: data.email, nickname: data.nickname });
    alert("🎉 회원가입 완료!");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 text-center">이메일을 입력해주세요</h2>
            <div>
              <input 
                {...register("email")} 
                placeholder="example@email.com" 
                className={`w-full p-4 bg-slate-50 border rounded-xl outline-none transition-all ${errors.email ? "border-red-500" : "border-slate-200 focus:border-blue-600"}`} 
              />
              {errors.email && <p className="text-red-500 text-xs mt-2 ml-1">{errors.email.message}</p>}
            </div>
            <button 
              type="button" 
              onClick={() => handleNext(["email"])} 
              disabled={!emailValue || !!errors.email} 
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-md"
            >
              다음
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-blue-600 font-bold text-sm mb-1">{emailValue}</p>
              <h2 className="text-2xl font-bold text-slate-800">비밀번호를 설정해주세요</h2>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type={showPw ? "text" : "password"} 
                  {...register("password")} 
                  placeholder="비밀번호 (6자 이상)" 
                  className={`w-full p-4 bg-slate-50 border rounded-xl outline-none transition-all ${errors.password ? "border-red-500" : "border-slate-200 focus:border-blue-600"}`} 
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-4 text-slate-400 hover:text-blue-600">
                  {showPw ? "👁️" : "🙈"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password.message}</p>}

              <input 
                type="password" 
                {...register("passwordCheck")} 
                placeholder="비밀번호 재확인" 
                className={`w-full p-4 bg-slate-50 border rounded-xl outline-none transition-all ${errors.passwordCheck ? "border-red-500" : "border-slate-200 focus:border-blue-600"}`} 
              />
              {errors.passwordCheck && <p className="text-red-500 text-xs ml-1">{errors.passwordCheck.message}</p>}
            </div>
            <button 
              type="button" 
              onClick={() => handleNext(["password", "passwordCheck"])} 
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all"
            >
              다음
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800">닉네임을 정해주세요</h2>
            <div className="w-20 h-20 bg-slate-50 rounded-full mx-auto border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[10px]">
              프로필 이미지
            </div>
            <div>
              <input 
                {...register("nickname")} 
                placeholder="멋진 닉네임을 입력해주세요" 
                className={`w-full p-4 bg-slate-50 border rounded-xl outline-none focus:border-blue-600 text-center transition-all ${errors.nickname ? "border-red-500" : "border-slate-200"}`} 
              />
              {errors.nickname && <p className="text-red-500 text-xs mt-2">{errors.nickname.message}</p>}
            </div>
            <button 
              type="submit" 
              disabled={!isValid} 
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg disabled:bg-slate-200 disabled:text-slate-400 transition-all"
            >
              회원가입 완료
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignupPage;