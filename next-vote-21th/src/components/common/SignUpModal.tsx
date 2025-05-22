import { useRouter } from "next/navigation";

const SignUpModal = () => {
  const router = useRouter();
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="h-[280px] w-[320px] overflow-hidden rounded-3xl bg-white md:h-[320px] md:w-[400px]">
        회원가입이 완료 되었습니다.
      </div>

      <button
        className="text-heading2 bg-green hover:bg-green-dark h-[63px] h-full w-1/2 w-full cursor-pointer items-center justify-end"
        onClick={()=>router.push("/login")}
      >
        확인
      </button>
    </div>
  );
};
export default SignUpModal;
