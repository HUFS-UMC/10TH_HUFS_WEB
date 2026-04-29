import { z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form";
import { postSignup } from "../apis/auth";
import { useAuth } from "../context/AuthContext";

const schema = z.object ( {
    email: z.string().email({message: "올바른 이메일이 아닙니다."}),
    password: z.string().min(8, {
        message: "비밀번호는 8자 이상이어야 합니다. "
    }).max(20, {
        message: "비밀번호는 20자 이하여야 합니다."
    }),
    passwordCheck: z.string().min(8, {
        message: "비밀번호는 8자 이상이어야 합니다. "
    }).max(20, {
        message: "비밀번호는 20자 이하여야 합니다."
    }),
    name: z.string().min(1, {message: "이름을 입력해주세요"}),
})
.refine((data) => data.password === data.passwordCheck, {
    message:" 비밀번호가 일치하지 않습니다.",
    path: ['passwordCheck'],
});

type Formfields = z.infer<typeof schema>

const SignupPage = () => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<Formfields>( {
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordCheck:"",
        },
        resolver: zodResolver(schema),
        mode:"onBlur",
    });

// src/pages/SignupPage.tsx
const { login } = useAuth(); // AuthContext에서 login 함수 가져오기


    const onSubmit:SubmitHandler<Formfields> = async (data) => {
        const { passwordCheck, ...rest} = data;
        if(isSubmitting) return;

        try {
            const response = await postSignup(rest);
            console.log(response);
            
            // 2. 가입 시 사용한 정보로 즉시 로그인 함수 호출
            await login({ 
                email: data.email, 
                password: data.password 
            }); 

            if (response.status) {
                alert("회원가입 성공! 로그인 페이지로 이동합니다.");
                window.location.href = '/login'; // 가장 확실한 페이지 이동 방식
            }
            
            // 3. 로그인이 성공하면 AuthContext의 useEffect에 의해 
            // 자동으로 홈페이지나 마이페이지로 이동하게 됩니다.
        } catch (error: any) {
            if(error?.response.status === 409) {
                alert("이미 가입된 이메일입니다.")
            }else{
            alert("오류가 발생했습니다.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <input {...register('email')}
            type="name" className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.email  ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            placeholder={"이메일"} />
            {errors.email && (
                <div className="text-red-500 stext-sm"> {errors.email.message}</div>
            )}

            <input 
            {...register('password')}
            type={"password"} className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            placeholder={"비밀번호"} />
            {errors.password && (
                <div className="text-red-500 stext-sm"> {errors.password.message}</div>
            )}

            <input 
            {...register('passwordCheck')}
            type={"password"} className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            placeholder={"비밀번호 확인"} />
            {errors.passwordCheck && (
                <div className="text-red-500 stext-sm"> {errors.passwordCheck.message}</div>
            )}

            <input 
            {...register('name')}
            type={"name"} className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            placeholder={"이름"} />
            {errors.name && (
                <div className="text-red-500 stext-sm"> {errors.name.message}</div>
            )}
            
            <button disabled={isSubmitting}
            type="submit" className="w-full bg-blue-600
            text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700
            transition-colors cursor-pointer disabled:bg-gray-400">{isSubmitting ? "가입 중..." : "회원가입"}</button>
        </form>
    </div>)
};

export default SignupPage;