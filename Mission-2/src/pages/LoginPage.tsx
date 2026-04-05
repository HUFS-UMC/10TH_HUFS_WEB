import useForm from "../hooks/useForm"
import  type { UserSignInformation } from "../utils/validate"
import { validateSignin } from "../utils/validate"

const LoginPage = () => {
    const {values, errors, touched, getInputProps} = useForm<UserSignInformation>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateSignin
    })


    const handleSubmit = () => {
        console.log(values);
    }

    const isDisabled = Object.values(errors || {}).some((error) => error.length > 0 || 
        Object.values(values).some((value) => value === "")
    );

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex flex-col gap-3">
            <input 
                {...getInputProps("email")}
                className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
                    errors?.email && touched?.email
                    ? "border-red-500 bg-red-200"
                    : "border-gray-300"
                }`}
                type={"email"} 
                placeholder={"이메일"}
            />
            {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
            
            <input 
                {...getInputProps("password")}
                className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
                    errors?.password && touched?.password
                    ? "border-red-500 bg-red-200"
                    : "border-gray-300"
                }`}
                type={"password"} 
                placeholder={"비밀번호"}
            />
            {errors.password && touched.password && <div className="text-red-500 text-sm">{errors.password}</div>}
            <button type ="button" className="bg-[#807bff] text-white w-full p-[10px] rounded-sm
            hover:bg-[#6b63d9] active:bg-[#5a52b8] disabled:bg-[#ccc]"
            onClick={handleSubmit} disabled={isDisabled}
            >로그인</button>  
        </div>
    </div>
  )
}

export default LoginPage
