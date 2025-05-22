interface LoginModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const LoginModal = ({ onClose, onConfirm }: LoginModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
      <div className="w-[320px] md:w-[400px] h-[280px] md:h-[320px] bg-white rounded-3xl overflow-hidden">
        <div className="text-heading1 w-full h-[217px] md:h-[257px] flex flex-col justify-center items-center">
          <div>로그인이 필요한 서비스입니다.</div>
          <div>로그인 하시겠습니까?</div>
        </div>
        
        <div className="text-heading2 w-full h-[63px] items-center justify-end">
          <button className="w-1/2 h-full bg-green hover:bg-green-dark cursor-pointer" onClick={onClose}>아니오</button>
          <button className="w-1/2 h-full bg-gray-300 hover:bg-gray-700 cursor-pointer" onClick={onConfirm}>예</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
