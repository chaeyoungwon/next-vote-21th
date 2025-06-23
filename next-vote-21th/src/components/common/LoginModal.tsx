import CommonModal from "./CommonModal";

interface LoginModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const LoginModal = ({ onClose, onConfirm }: LoginModalProps) => {
  return (
    <CommonModal
      messageKey="login"
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

export default LoginModal;
