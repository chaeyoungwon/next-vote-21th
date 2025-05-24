import { useState } from "react";

import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label: string;
  type?: "text" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onCheckDuplicate?: () => void; // 중복 확인 버튼 클릭 시
  showCheckButton?: boolean; // 중복 확인 버튼 표시 여부
  error?: string;
  status?: "error" | "success";
  autoComplete?: string;
}

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  onCheckDuplicate,
  showCheckButton = false,
  error,
  autoComplete,
  status,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <label className="flex flex-col gap-[3px]">
      <div className="flex items-start gap-[10px]">
        <span className="text-body1-sb md:text-heading4 w-[77px]">{label}</span>

        <div className="relative flex flex-col">
          <input
            type={isPasswordField && !showPassword ? "password" : "text"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={clsx(
              "text-cap1-med md:text-body2-med min-w-[226px] border-b border-black py-1 outline-none placeholder:text-gray-600",
              showCheckButton && !isPasswordField && "pr-[60px]",
            )}
          />

          {/* 비밀번호 눈 아이콘 */}
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute top-[6px] right-1 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}

          {/* 중복 확인 버튼 */}
          {showCheckButton && !isPasswordField && (
            <button
              type="button"
              onClick={onCheckDuplicate}
              className="text-cap1-med bg-green text-gray-0 hover:bg-green-dark absolute top-[-2px] right-0 w-fit cursor-pointer rounded-[10px] px-[6px] py-1 md:top-[1px]"
            >
              중복 확인
            </button>
          )}

          <span
            className={clsx(
              "text-cap1-med mt-1 h-[1.25rem] md:h-[0.875rem]",
              error && "text-red",
              status === "success" && "text-green",
            )}
          >
            {error || " "}
          </span>
        </div>
      </div>
    </label>
  );
};

export default InputField;
