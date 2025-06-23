import CommonModal from "./CommonModal";

interface VoteModalProps {
  target: string;
  targetType: "팀" | "파트장";
  onClose: () => void;
  onConfirm: () => void;
}

const VoteModal = ({ onClose, onConfirm }: VoteModalProps) => {
  return (
    <CommonModal
      messageKey="vote"
      buttons={[
        {
          label: "아니오",
          onClick: onClose,
          className: "bg-gray-300 text-gray-0 hover:bg-gray-700",
        },
        {
          label: "예",
          onClick: onConfirm,
          className: "bg-green text-gray-0 hover:bg-green-dark",
        },
      ]}
    />
  );
};

export default VoteModal;
