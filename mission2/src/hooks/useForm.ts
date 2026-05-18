import { useState, useEffect } from "react"; 
import type { ChangeEvent } from "react";        

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof T, text: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [values, validate]);

  const getInputProps = (name: keyof T) => {
    return {
      value: values[name],
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        handleChange(name, e.target.value),
      onBlur: () => handleBlur(name),
    };
  };

  return {
    values,
    errors,
    touched,
    getInputProps,
  };
}

export default useForm;