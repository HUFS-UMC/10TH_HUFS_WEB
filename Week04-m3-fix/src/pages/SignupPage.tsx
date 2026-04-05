import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod"
import { postSignup } from "../apis/auth";

const schema = z.object({
    email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
    password: z
        .string()
        .min(8, {message: "비밀번호는 최소 8자 이상이어야 합니다."})
        .max(20, {message: "비밀번호는 최대 20자 이하여야 합니다."}),

    passwordCheck: z
        .string()
        .min(8, {message: "비밀번호는 최소 8자 이상이어야 합니다."})
        .max(20, {message: "비밀번호는 최대 20자 이하여야 합니다."}),

    name: z
        .string().min(1, {message: "이름은 최소 1자 이상이어야 합니다."})
    })
    .refine((data) => data.password === data.passwordCheck, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordCheck"], //오류 메시지를 passwordCheck 필드에 표시
    
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordCheck: "",
        },
        resolver: zodResolver(schema),
        mode: "onBlur", //필드가 포커스를 잃었을 때 유효성 검사 실행
    });

    const onSubmit:SubmitHandler<FormFields> = async(data) =>{
        const {passwordCheck, ...rest} = data; //passwordCheck는 서버로 보내지 않도록 제외

        const response = await postSignup(rest);

        console.log(response);
    };

    return <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex flex-col gap-3">
            <input
            {...register('email')}
            type={"email"}
            placeholder={"이메일"}
            className={"border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.email ? 'border-red-500 bg-red-200' : 'border-[#ccc]'}"} />
            
            {/* 이메일에 에러 발생 시 */}
            {errors.email && (
                <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}

            <input
            {...register('password')}
            type={"password"}
            placeholder={"비밀번호"}
            className={"border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.password ? 'border-red-500 bg-red-200' : 'border-[#ccc]'}"} />

            {/* 비밀번호에 에러 발생 시 */}
            {errors?.password && (
                <div className="text-red-500 text-sm">{errors.password.message}</div>
            )}

            <input
            {...register('passwordCheck')}
            type={"password"}
            placeholder={"비밀번호 확인"}
            className={"border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.passwordCheck ? 'border-red-500 bg-red-200' : 'border-[#ccc]'}"}
            />

            {/* 비밀번호 확인에 에러 발생 시 */}
            {errors?.passwordCheck && (
                <div className="text-red-500 text-sm">
                    {errors.passwordCheck.message}</div>
            )}

            <input
            {...register('name')}
            type={"name"}
            placeholder={"이름"}
            className={"border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.name ? 'border-red-500 bg-red-200' : 'border-[#ccc]'}"}
            />

            {/* 이름에 에러 발생 시 */}
            {errors?.name && (
                <div className="text-red-500 text-sm">
                    {errors.name.message}</div>
            )}

            <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className={"bg-blue-500 text-white w-[300px] p-[10px] rounded-sm disabled:bg-[#ccc]"}>
                회원가입
            </button> 
        </div>
    </div>
}

export default SignupPage