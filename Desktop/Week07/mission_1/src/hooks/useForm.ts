import { useState } from "react";

interface UseFormProps {
  initialValues: { [key: string]: string };
  validate: (values: { [key: string]: string }) => { [key: string]: string };
}

const useForm = ({ initialValues, validate }: UseFormProps) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
    const newErrors = validate(values);
    setErrors(newErrors);
  };

  const isValid = Object.keys(validate(values)).length === 0 && 
                  Object.values(values).every(v => v.length > 0);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
  };
};

export default useForm;