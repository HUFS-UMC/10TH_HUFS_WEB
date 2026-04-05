import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormPage<T> {
    initialValue: T;
    //값이 올바른지 검증
    validate: (values: T) => Record<keyof T, string>
}

function useForm<T>({initialValue, validate}: UseFormPage<T>) {
    const[values, setValues] = useState(initialValue);
    const[touched, setTouched] = useState<Record<string, boolean>>();
    const[errors, setErrors] = useState<Record<string, string>>();

    //사용자가 입력값을 바꿀 때 실행
    const handleChange= (name: keyof T, text: string)=> {
        setValues ({
            ...values, //기존입력값유지 (불변성 유지)
            [name]: text,
        });
    };

    const handleBlur= (name: keyof T) => {
        setTouched ({
            ...touched,
            [name]: true,
        });
    }

    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleChange(name, e.target.value);

        const onBlur =() => handleBlur(name);

        return {value, onChange, onBlur};
    };

    useEffect( () => {
        const newErrors = validate(values);
        setErrors(newErrors); //오류메세지 업데이트
    }, [validate, values]);

    return { values, errors, touched, getInputProps}
}

export default useForm;