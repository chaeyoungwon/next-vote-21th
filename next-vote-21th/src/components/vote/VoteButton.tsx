interface VoteButtonProps {
  onClick: () => void;
  text: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
}

const VoteButton = ({
  onClick,
  text,
  borderColor,
  textColor,
  bgColor,
}: VoteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-heading3 relative flex h-11 w-[218px] cursor-pointer items-center justify-center gap-[14px] rounded-[24px] border border-solid ${borderColor} ${textColor} ${bgColor}`}
    >
      <div>{text}</div>
      <div className="absolute top-1/2 right-[19px] -translate-y-1/2">&gt;</div>
    </button>
  );
};

export default VoteButton;
