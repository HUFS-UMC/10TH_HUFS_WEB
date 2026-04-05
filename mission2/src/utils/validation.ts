export const validateEmail = (email: string) => {
    if (!email.includes("@") || !email.includes(".")) {
        return "유효하지 않은 이메일 형식입니다.";
    }
    return "";
};

export const validatePassword = (password: string) => {
    if (password.length < 6) {
        return "비밀번호는 최소 6자 이상이어야 합니다.";
    }
    return "";
};