export type UserSignInformation = {
  email: string;
  password: string;
  confirmPassword: string;
};

function validateUser(values: UserSignInformation) {
  const errors: {
    email: string;
    password: string;
    confirmPassword: string;
  } = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.';
  }

  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 이내로 입력해주세요.';
  }

  return errors;
}

export function validateLogin(values: UserSignInformation) {
  return validateUser(values);
}