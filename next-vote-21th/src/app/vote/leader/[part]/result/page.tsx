import { use } from "react";

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

  return (
    <div className="relative ml-[31px] flex min-h-screen w-screen flex-col justify-start pt-[128px] md:items-center md:justify-center scrollbar-hide overflow-auto">
      <BackgroundShapes />
      <div className="text-heading3 md:text-heading1 text-violet-dark">
        현재 {part === "frontend" ? "프론트엔드" : "백엔드"} 파트장 투표 순위
      </div>
      <div className="grid grid-cols-1 pt-[36px] md:grid-cols-3 md:pt-[56px]">
        {voteList.map((item, index) => (
          <div className="flex items-center justify-start pb-[19px] md:mx-[28px] md:my-[19px] md:justify-center">
            <div
              className={`text-heading2 md:text-heading1 text-violet-dark ${index === 9 ? "pr-[12px]" : "pr-[16px]"}`}
            >
              {index + 1}
            </div>
            <div
              key={item.member}
              className="border-violet-dark bg-violet-light text-body1-sb md:text-heading4 flex h-[41px] w-[114px] items-center justify-center gap-[5px] rounded-[24px] border md:h-[50px] md:w-[120px] text-violet-pressed"
            >
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
