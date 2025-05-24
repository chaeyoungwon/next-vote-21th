"use client";

import InputField from "@/components/common/InputField";

import type { SignupErrors, SignupForm } from "@/types/signup/dto";

interface SignupFormFieldsProps {
  form: SignupForm;
  errors: SignupErrors;
  statuses: Record<"id" | "email", "error" | "success" | undefined>;
  handleInputChange: (
    key: keyof SignupForm,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  setForm: React.Dispatch<React.SetStateAction<SignupForm>>;
  setErrors: React.Dispatch<React.SetStateAction<SignupErrors>>;
  setStatuses: React.Dispatch<
    React.SetStateAction<
      Record<"id" | "email", "error" | "success" | undefined>
    >
  >;
  check: (
    type: "id" | "email",
    value: string,
    setErrors: React.Dispatch<React.SetStateAction<SignupErrors>>,
    setStatuses: React.Dispatch<
      React.SetStateAction<
        Record<"id" | "email", "error" | "success" | undefined>
      >
    >,
  ) => void;
}

const SignupFormFields = ({
  form,
  errors,
  statuses,
  handleInputChange,
  setForm,
  setErrors,
  setStatuses,
  check,
}: SignupFormFieldsProps) => {
  return (
    <div className="mb-6 flex flex-col gap-[10px]">
      <InputField
        label="아이디 *"
        placeholder="6~20자 이내로 입력해주세요."
        value={form.id}
        onChange={handleInputChange("id")}
        onCheckDuplicate={() => check("id", form.id, setErrors, setStatuses)}
        showCheckButton
        error={errors.id}
        status={statuses.id}
      />

      <InputField
        label="이메일 *"
        placeholder="이메일을 입력해주세요."
        value={form.email}
        autoComplete="email"
        onChange={handleInputChange("email")}
        onCheckDuplicate={() =>
          check("email", form.email, setErrors, setStatuses)
        }
        showCheckButton
        error={errors.email}
        status={statuses.email}
      />

      <InputField
        label="비밀번호 *"
        type="password"
        autoComplete="new-password"
        placeholder="문자, 숫자, 특수문자 포함 8~20자"
        value={form.password}
        onChange={e => {
          setForm({ ...form, password: e.target.value });

          if (errors.password)
            setErrors((prev: SignupErrors) => ({ ...prev, password: "" }));
        }}
        error={errors.password}
      />

      <InputField
        label="비밀번호 * 재입력 "
        type="password"
        autoComplete="new-password"
        placeholder="비밀번호 재입력"
        value={form.confirmPassword}
        onChange={e => {
          setForm({ ...form, confirmPassword: e.target.value });

          if (errors.confirmPassword)
            setErrors((prev: SignupErrors) => ({
              ...prev,
              confirmPassword: "",
            }));
        }}
        error={errors.confirmPassword}
      />
    </div>
  );
};

export default SignupFormFields;
