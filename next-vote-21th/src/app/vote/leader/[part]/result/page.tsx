import { use, useMemo } from "react";

import BackgroundShapes from "@/components/vote/BackgroundShape";

import { voteData } from "@/constants/voteData";

interface PageProps {
  params: Promise<{ part: string }>;
}
const partMap = {
  frontend: "FE",
  backend: "BE",
} as const;

const LeaderVoteResult = ({ params }: PageProps) => {
  const { part } = use(params);
  const voteList = voteData[partMap[part as keyof typeof partMap]];

  const sortedVoteList = useMemo(() => {
    return [...voteList].sort((a, b) => b.vote - a.vote);
  }, [voteList]);

  return (
    <div className="scrollbar-hide relative ml-[31px] flex min-h-screen w-screen flex-col justify-start overflow-auto pt-[128px] md:items-center md:justify-center">
      <BackgroundShapes />
      <div className="text-heading3 md:text-heading1 text-violet-dark">
        현재 {part === "frontend" ? "프론트엔드" : "백엔드"} 파트장 투표 순위
      </div>
      <div className="grid grid-cols-1 pt-[36px] md:grid-cols-3 md:pt-[56px]">
        {sortedVoteList.map((item, index) => (
          <div
            key={item.member}
            className="flex items-center justify-start pb-[19px] md:mx-[28px] md:my-[19px] md:justify-center"
          >
            <div
              className={`w-[33px] text-center text-heading2 md:text-heading1 text-violet-dark ${index === 9 ? "pr-[12px]" : "pr-[16px]"}`}
            >
              {index + 1}
            </div>
            <div className="border-violet-dark bg-violet-light text-body1-sb md:text-heading4 text-violet-pressed flex h-[41px] w-[114px] items-center justify-center gap-[5px] rounded-[24px] border md:h-[50px] md:w-[120px]">
              <div>{item.member}</div>
              <div>{item.vote}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderVoteResult;
