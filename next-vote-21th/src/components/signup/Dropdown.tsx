import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  options: readonly string[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Dropdown = ({
  options,
  selected,
  onSelect,
  placeholder,
  disabled,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[150px]">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(prev => !prev)}
        className="border-green text-green text-body1-sb flex w-full cursor-pointer items-center justify-between rounded-[20px] border px-4 py-2 text-left transition"
      >
        <span>{selected || placeholder}</span>
        <span className={`ml-2 ${isOpen ? "rotate-180" : ""}`}>▾</span>
      </button>

      {isOpen && (
        <ul className="border-green bg-gray-0 text-body2-med absolute z-10 mt-[7px] w-full border text-center shadow-sm">
          {options.map(option => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="cursor-pointer px-4 py-2 hover:underline"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
