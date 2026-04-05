import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { validateEmail, validatePassword } from "../utils/validation";

const LoginPage = () => {
    const navigate = useNavigate();

    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        setEmailError(validateEmail(e.target.value));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        setPasswordError(validatePassword(e.target.value));
    };

    const isFormValid =
        values.email &&
        values.password &&
        !emailError &&
        !passwordError;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("로그인 시도!");
    };

    return (
        <div className="flex items-center justify-center h-dvh bg-gray-900 relative">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-xl w-80"
            >
                <div className="flex items-center mb-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-white text-2xl mr-3"
                    >
                        {"<"}
                    </button>                
                    <h2 className="text-white text-2xl font-bold">
                        로그인
                    </h2>
                </div>

                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={values.email}
                    onChange={handleEmailChange}
                    className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
                />
                {emailError && (
                    <p className="text-red-500 text-sm mb-2">
                        {emailError}
                    </p>
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={values.password}
                    onChange={handlePasswordChange}
                    className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
                />
                {passwordError && (
                    <p className="text-red-500 text-sm mb-2">
                        {passwordError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-2 rounded text-white ${
                        isFormValid ? "bg-red-500" : "bg-gray-500"
                    }`}
                >
                    로그인
                </button>
            </form>
        </div>
    );
};

export default LoginPage;