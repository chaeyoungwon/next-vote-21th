interface PageProps {
  params: { part: string }; // 실제로는 이걸 유지
}

const LeaderVoteResult = ({ params }: PageProps) => {
  const { part } = params;

  return (
    <div className="mt-16 flex min-h-screen w-screen flex-col items-center justify-center">
      <div className="text-heading1 text-violet-pressed">
        {part === "frontend" ? "프론트엔드" : "백엔드"} 파트장 투표 결과입니다.
      </div>
    </div>
  );
};

export default LeaderVoteResult;
