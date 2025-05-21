interface PartSelectorProps {
  selectedPart: string | null;
  onSelect: (part: "Front-End" | "Back-End") => void;
}

const PartSelector = ({ selectedPart, onSelect }: PartSelectorProps) => {
  return (
    <div className="mx-auto w-full min-w-[313px]">
      <p className="text-body1-sb md:text-heading4 mb-[15px]">파트 *</p>
      <div className="border-green flex w-full overflow-hidden rounded-full border">
        {(["Front-End", "Back-End"] as const).map(part => (
          <button
            key={part}
            onClick={() => onSelect(part)}
            className={`text-heading3 w-1/2 cursor-pointer px-6 py-2 transition-colors duration-200 ${
              selectedPart === part ? "bg-green text-white" : "text-green"
            } ${part === "Front-End" ? "rounded-l-full" : "rounded-r-full"}`}
          >
            {part}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PartSelector;
