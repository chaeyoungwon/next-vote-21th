interface LoginModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const LoginModal = ({ onClose, onConfirm }: LoginModalProps) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60">
      <div className="h-[280px] w-[320px] overflow-hidden rounded-3xl bg-white md:h-[320px] md:w-[400px]">
        <div className="text-heading2 flex h-[217px] w-full flex-col items-center justify-center md:h-[257px]">
          <div>로그인이 필요한 서비스입니다.</div>
          <br />
          <div>로그인 하시겠습니까?</div>
        </div>

        <div className="text-heading2 text-gray-0 h-[63px] w-full items-center justify-end">
          <button
            className="text-gray-0 h-full w-1/2 cursor-pointer bg-gray-300 hover:bg-gray-700"
            onClick={onClose}
          >
            아니오
          </button>
          <button
            className="bg-green hover:bg-green-dark text-gray-0 h-full w-1/2 cursor-pointer"
            onClick={onConfirm}
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
