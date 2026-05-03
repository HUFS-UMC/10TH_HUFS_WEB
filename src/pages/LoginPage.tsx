import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validata";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);

  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateSignin,
  });

    const handleSubmit = async () => {
        await login(values);
    };

    //오류가 하나라도 있으면 버튼 비활성화
    const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || //오류가 있으면 true
    Object.values(values).some((value) => value === ''); //값이 비어있으면 true

    return <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex flex-col gap-3">
            <input
            {...getInputProps('email')}
            type={"email"}
            placeholder={"이메일"}
            className={"border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.email && touched?.email ? 'border-red-500 bg-red-100' : 'border-[#ccc]'}"} />
            
            {/* 이메일 잘못 기입했을 경우의 메시지 */}
            {errors?.email && touched?.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
            )}

            <input
            {...getInputProps('password')}
            type={"password"}
            placeholder={"비밀번호"}
            className={"border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.password && touched?.password ? 'border-red-500 bg-red-100' : 'border-[#ccc]'}"} />

            {/* 비밀번호 잘못 기입했을 경우의 메시지 */}
            {errors?.password && touched?.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
            )}

            <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={"bg-blue-500 text-white w-[300px] p-[10px] rounded-sm disabled:bg-[#ccc]"}>
            로그인
            </button> 
        </div>
    </div>
    }


export default LoginPage