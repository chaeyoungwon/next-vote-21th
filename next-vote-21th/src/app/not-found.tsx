import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-heading1 text-gray-900">404</h1>
      <p className="text-body1-med text-gray-600">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="text-body1-sb text-green border-green hover:bg-green-light cursor-pointer rounded-3xl border px-3 py-2"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
