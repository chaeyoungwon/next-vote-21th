interface InputFieldProps {
  label: string;
  type?: "text" | "password";
  placeholder: string;
  error?: string;
}

const InputField = ({
  label,
  type = "text",
  placeholder,
  error,
}: InputFieldProps) => {
  return (
    <label className="flex flex-col gap-[3px]">
      <div className="flex items-center gap-[10px]">
        <span className="text-body1-sb w-[77px] md:!text-[20px]">{label}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="text-cap1-med min-w-[226px] border-b border-black py-1 outline-none placeholder:text-gray-600 md:!text-[18px]"
        />
      </div>
      <span className="text-cap1-med text-red ml-[87px] h-[1.25rem] md:h-[0.875rem]">
        {error || " "}
      </span>
    </label>
  );
};

export default InputField;
