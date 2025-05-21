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
  return (
    <label className="flex flex-col gap-[3px]">
      <div className="flex items-start gap-[10px]">
        <span className="text-body1-sb w-[77px] md:!text-[18px]">{label}</span>
        <div className="flex flex-col">
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="text-cap1-med min-w-[226px] border-b border-black py-1 outline-none placeholder:text-gray-600 md:!text-base"
          />
          <span className="text-cap1-med text-red h-[1.25rem] md:h-[0.875rem]">
            {error || " "}
          </span>
        </div>
      </div>
    </label>
  );
};

export default InputField;
