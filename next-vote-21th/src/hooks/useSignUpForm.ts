import { useEffect, useState } from "react";

import { validateSignupForm } from "@/utils/validateSignUpForm";

export const useSignupForm = () => {
  const [form, setForm] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const validate = () => {
    const newErrors = validateSignupForm(form);
    setErrors(newErrors);
    return Object.values(newErrors).every(e => e === "");
  };

  useEffect(() => {
    const hasError = Object.values(errors).some(e => e);
    const hasEmpty =
      !form.id || !form.email || !form.password || !form.confirmPassword;
    setIsDisabled(hasError || hasEmpty);
  }, [form, errors]);

  return {
    form,
    setForm,
    errors,
    setErrors,
    isDisabled,
    validate,
  };
};
