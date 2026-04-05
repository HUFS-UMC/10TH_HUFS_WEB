// input 값들을 관리하는 커스텀 훅
import { useState, type ChangeEvent, useEffect } from "react";

interface UseFormProps<T> {
    initialValues: T;
    // 값이 올바른지 검증하는 함수
    validate: (values: T) => Partial<Record<keyof T, string>>;
}

function useForm<T>({ initialValues, validate }: UseFormProps<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    //사용자가 입력값을 바꿀 때 실행되는 함수
    const handleChange = (name: keyof T, text: string) => {
        setValues(value => ({ ...value, // 불변성 유지 (기존 값 유지)
            [name]: text }));
    };

    const handleBlur = (name: keyof T) => {
        setTouched(touched => ({ ...touched,
            [name]: true }));
    };

    //이메일 input, 비밀번호 input, 속성들을 가져오는 것
    const getInputProps = (name: keyof T) => {
  const value = values[name];

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => handleChange(name, e.target.value);

  const onBlur = () => handleBlur(name);

  return { value, onChange, onBlur };
};

// values가 변경될 때마다 에러 검증 로직이 실행됨
    useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors as Record<string, string>); //에러 메세지 업데이트
  }, [values, validate]);

  return { values, errors, touched, getInputProps };
}

export default useForm;

