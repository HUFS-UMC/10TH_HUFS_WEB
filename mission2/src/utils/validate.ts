export type UserSigninInformation = {
  email: string;
  password: string;
};

// 공통 유효성 검사
function validateUser(values: UserSigninInformation) {
  const errors: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  };

  // 이메일 검사
  if (
    !/^[0-9a-zA-Z]([._-]?[0-9a-zA-Z])*@[0-9a-zA-Z]([._-]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
      values.email
    )
  ) {
    errors.email = "올바른 이메일 형식이 아닙니다!";
  }

  // 비밀번호 검사 (8~20자)
  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }

  return errors;
}

// 로그인 유효성 검사 (이름 유지)
function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}

export { validateSignin };