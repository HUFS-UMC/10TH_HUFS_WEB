import { useState } from "react";

type FormValues = {
    email: string;
    password: string;
};

export const useForm = (initialValues: FormValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return { values, handleChange };
};