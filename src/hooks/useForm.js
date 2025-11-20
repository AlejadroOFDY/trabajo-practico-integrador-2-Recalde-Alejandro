import { useState } from "react";

export const useForm = (initialValue = {}) => {
  const [form, setForm] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

  const handleReset = () => {
    setForm(initialValue);
  };

  return { form, setForm, handleChange, handleReset };
};
