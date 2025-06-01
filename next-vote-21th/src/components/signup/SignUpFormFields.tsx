import { FieldErrors, UseFormRegister } from "react-hook-form";

import type { SignupForm } from "@/types/signup/dto";

import InputField from "../common/InputField";

interface SignupFormFieldsProps {
  register: UseFormRegister<SignupForm>;
  errors: FieldErrors<SignupForm>;
  watch: (name: keyof SignupForm) => string;
  statuses: Record<"id" | "email", "error" | "success" | undefined>;
  check: (type: "id" | "email", value: string) => void;
}

const SignupFormFields = ({
  register,
  errors,
  watch,
  statuses,
  check,
}: SignupFormFieldsProps) => {
  return (
    <div className="mb-6 flex flex-col gap-[10px]">
      {(["id", "email"] as const).map(field => (
        <InputField
          key={field}
          label={`${field === "id" ? "아이디 *" : "이메일 *"}`}
          placeholder={
            field === "id"
              ? "6~20자 이내로 입력해주세요."
              : "이메일을 입력해주세요."
          }
          {...register(field)}
          onCheckDuplicate={() => check(field, watch(field))}
          showCheckButton
          error={errors[field]?.message}
          status={statuses[field]}
          autoComplete={field === "email" ? "email" : undefined}
        />
      ))}

      <InputField
        label="비밀번호 *"
        type="password"
        autoComplete="new-password"
        placeholder="문자, 숫자, 특수문자 포함 8~20자"
        {...register("password")}
        error={errors.password?.message}
      />

      <InputField
        label="비밀번호 * 재입력 "
        type="password"
        autoComplete="new-password"
        placeholder="비밀번호 재입력"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
    </div>
  );
};

export default SignupFormFields;
