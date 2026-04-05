import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage=()=>{
    const navigate = useNavigate();

    const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: {
        email: "",
        password: "",
    },
    });

const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
  try {
    console.log(data);
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

        <h1 className="text-white text-3xl font-bold">로그인</h1>
        </div>

        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate >
            <input
            type="text"
            placeholder="이메일을 입력해주세요!"
            {...register("email", {
                required: "이메일을 입력해주세요.",
                validate: (value) =>
                value.includes("@") || "올바른 이메일 형식을 입력해주세요.",
            })}
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-[#dda5e3]"
            />
            {errors.email && (
            <p className="text-red-500 text-sm -mt-2">{errors.email.message}</p>
            )}

            <input
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                value: 8,
                message: "비밀번호는 8자 이상이어야 합니다.",
                },
            })}
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-[#dda5e3]"
            />
            {errors.password && (
            <p className="text-red-500 text-sm -mt-2">{errors.password.message}</p>
            )}

            <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                isValid && !isSubmitting
                ? "bg-[#dda5e3] text-white hover:bg-[#c98bd1] cursor-pointer"
                : "bg-gray-500 text-gray-200 cursor-not-allowed"
            }`}
            >
            {isSubmitting ? "로그인 중..." : "로그인"}
            </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;