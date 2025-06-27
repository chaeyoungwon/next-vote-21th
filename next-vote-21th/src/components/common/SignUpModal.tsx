import CommonModal from './CommonModal';

interface SignUpModalProp {
  onConfirm: () => void;
}

const SignUpModal = ({ onConfirm }: SignUpModalProp) => {
  return (
    <CommonModal
      messageKey="signup"
      buttons={[
        {
          label: '확인',
          onClick: onConfirm,
          className: 'bg-green text-gray-0 hover:bg-green-dark',
        },
      ]}
    />
  );
};

export default SignUpModal;