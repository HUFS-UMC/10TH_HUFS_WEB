import { useNavigate } from "react-router-dom";
import useForm from "../\bhooks/useForm";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/v1/auth/google/login"; };

  const validate = (values: any) => {
    const errors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.email && !emailRegex.test(values.email)) {
      errors.email = "올바른 이메일 형식을 입력해주세요.";
    }
    if (values.password && values.password.length < 8) {
      errors.password = "비밀번호는 8자 이상이어야 합니다.";
    }
    return errors;
  };

  const { values, errors, touched, handleChange, handleBlur, isValid } = useForm({
    initialValues: { email: "", password: "" },
    validate,
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/v1/auth/signin", {
        email: values.email,
        password: values.password,
      });

      console.log("서버 전체 응답:", response.data);

      const tokenData = response.data.data;
      const { accessToken, refreshToken } = tokenData;
      
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        alert("🎉 로그인 성공!");
        navigate("/");
      } else {
        throw new Error("토큰이 응답에 포함되어 있지 않습니다.");
      }

    } catch (error: any) {
      console.error("로그인 에러 상세:", error.response?.data || error.message);
      alert("로그인에 실패했습니다. 계정 정보를 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-95">
          <div className="relative flex items-center justify-center mb-10">
            <button 
              onClick={() => navigate(-1)} 
              className="absolute left-0 p-2 text-slate-400 hover:text-blue-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-slate-800">로그인</h2>
          </div>

          <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3.5 mb-8 hover:bg-slate-50 transition-all shadow-sm">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-semibold text-slate-700">구글로 시작하기</span>
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="text-[10px] text-slate-400 font-bold tracking-widest">OR</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <div className="space-y-5 mb-8">
            <div>
              <input 
                type="email" 
                placeholder="이메일을 입력해주세요" 
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`w-full bg-slate-50 border rounded-xl p-4 text-sm focus:outline-none transition-all ${
                  touched.email && errors.email ? "border-red-500" : "border-slate-200 focus:border-blue-500"
                }`}
              />
              {touched.email && errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>}
            </div>

            <div>
              <input 
                type="password" 
                placeholder="비밀번호를 입력해주세요" 
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                className={`w-full bg-slate-50 border rounded-xl p-4 text-sm focus:outline-none transition-all ${
                  touched.password && errors.password ? "border-red-500" : "border-slate-200 focus:border-blue-500"
                }`}
              />
              {touched.password && errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password}</p>}
            </div>
          </div>

          <button 
            type="button"
            onClick={handleLogin}
            disabled={!isValid}
            className={`w-full py-4 rounded-xl font-bold shadow-md transition-all ${
              isValid ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]" : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            로그인하기
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            계정이 없으신가요? <span onClick={() => navigate("/signup")} className="text-blue-600 font-semibold cursor-pointer hover:underline">회원가입</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;