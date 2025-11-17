import { useState } from "react";

export const useForm = (initialValue = {}) => {
  const [form, setForm] = useState(initialValue);

  const { username, password } = setForm;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
};

handleReset = () => {
  useForm(initialValue);
};
return { value, ...value, handleChange, handleReset };
