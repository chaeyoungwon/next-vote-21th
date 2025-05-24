interface SignUpModalProp {
  onConfirm: () => void;
}

const SignUpModal = ({ onConfirm }: SignUpModalProp) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60">
      <div className="flex h-[280px] w-[320px] flex-col overflow-hidden rounded-3xl bg-white md:h-[320px] md:w-[400px]">
        <div className="text-heading2 flex h-[217px] items-center justify-center md:h-[257px]">
          회원가입이 완료 되었습니다.
        </div>
        <button
          className="text-heading2 bg-green text-gray-0 hover:bg-green-dark h-[63px] w-full cursor-pointer items-center justify-end"
          onClick={onConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
};
export default SignUpModal;
