type Part = "frontend" | "backend";

interface LeaderPageProps {
  params: { part: Part };
}

const LeaderVoteResult = ({ params }: LeaderPageProps) => {
  const { part } = params;
  console.log("파트장 투표 결과 로딩")
  return (
    <div className="mt-16 flex min-h-screen w-screen flex-col items-center justify-center">
      {part}파트장 투표 결과 입니다
    </div>

  );
};
export default LeaderVoteResult;
