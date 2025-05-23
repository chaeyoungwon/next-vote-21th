import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label: string;
  type?: "text" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
}

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
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
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={`text-cap1-med md:text-body2-med min-w-[226px] border-b border-black py-1 outline-none placeholder:text-gray-600 ${
              isPasswordField ? "pr-6" : ""
            }`}
          />

          {/* 눈 아이콘 */}
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute top-[6px] right-1 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}

          <span className="text-cap1-med text-red mt-1 h-[1.25rem] md:h-[0.875rem]">
            {error || " "}
          </span>
        </div>
      </div>
    </label>
  );
};

export default InputField;
