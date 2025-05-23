import { useEffect, useState } from "react";

import { signupSchema } from "@/schemas/signupSchema";

import { SignupErrors, SignupForm } from "@/types/signup/dto";

const initialForm: SignupForm = {
  id: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialErrors: SignupErrors = {
  id: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const useSignupForm = () => {
  const [form, setForm] = useState<SignupForm>(initialForm);
  const [errors, setErrors] = useState<SignupErrors>(initialErrors);
  const [isDisabled, setIsDisabled] = useState(true);

  const applyValidationErrors = (zodErrors: SignupErrors) => {
    setErrors(zodErrors);
  };

  const validate = () => {
    const result = signupSchema.safeParse(form);

    if (!result.success) {
      const newErrors: SignupErrors = { ...initialErrors };

      result.error.errors.forEach(({ path, message }) => {
        const field = path[0] as keyof SignupErrors;
        newErrors[field] = message;
      });

      applyValidationErrors(newErrors);
      return false;
    }

    setErrors(initialErrors);
    return true;
  };

  useEffect(() => {
    const hasError = Object.values(errors).some(Boolean);
    const hasEmpty = Object.values(form).some(val => val === "");
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
