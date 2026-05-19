export type UserSignInformation = {
  email: string;
  password: string;
}

function validateUser(values: UserSignInformation) {
    const errors = {
        email: "",
        password: "",
    };
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if(!emailRegex.test(values.email)) {
        errors.email = "유효한 이메일 주소를 입력해주세요.";
    }
    if(values.password.length < 8 || values.password.length > 20) {
        errors.password = "비밀번호는 8자 이상 20자 이하여야 합니다.";
    }

    return errors;
}

function validateSignin(valiues: UserSignInformation) {
    return validateUser(valiues);
}

export {validateSignin}
