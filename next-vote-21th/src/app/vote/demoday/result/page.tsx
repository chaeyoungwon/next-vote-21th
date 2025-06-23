import BackgroundShapes from "@/components/vote/BackgroundShape";

import { voteData } from "@/constants/voteData";

const DemodayVoteResult = () => {
  const sortedList = [...voteData.Demoday].sort((a, b) => b.vote - a.vote);

  return (
    <div className="scrollbar-hide relative ml-[31px] flex min-h-screen w-screen flex-col justify-start overflow-auto pt-[128px] md:items-center md:justify-center">
      <BackgroundShapes />

      <div className="text-heading3 md:text-heading1 text-green-dark">
        현재 데모데이 투표 순위
      </div>

      <div className="flex flex-col gap-4 pt-[36px] md:pt-[56px]">
        {sortedList.map((team, index) => (
          <div
            key={team.team}
            className="md:justify-center gap-[13px] md:gap-[22px] flex items-center justify-start"
          >
            <div className="text-heading2 md:text-heading1 text-green-dark">{index + 1}</div>
            <div className="bg-green-light border-green-dark text-body1-sb md:text-heading4 text-green-dark flex h-11 w-[261px] items-center justify-center gap-[7px] rounded-[24px] border">
              <div>{team.team}</div>
              <div>{team.vote}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemodayVoteResult;
