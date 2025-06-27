interface VoteCountItem {
  electionId: number;
  candidateName: string;
  candidateId: number;
  voteCount: number;
}

interface VoteResultItemProps {
  rank: number;
  candidate: VoteCountItem;
  isMyVote: boolean;
}

const VoteResultItem = ({ rank, candidate, isMyVote }: VoteResultItemProps) => {
  return (
    <div className="flex items-center justify-start pb-[19px] md:mx-[28px] md:my-[19px] md:justify-center">
      <div
        className={`text-heading2 md:text-heading1 text-violet-dark w-[33px] text-center ${
          rank === 10 ? "pr-[12px]" : "pr-[16px]"
        }`}
      >
        {rank}
      </div>
      <div
        className={`border-violet-dark text-body1-sb md:text-heading4 flex h-[41px] w-[114px] items-center justify-center gap-[5px] rounded-[24px] border md:h-[50px] md:w-[120px] ${
          isMyVote
            ? "bg-violet-pressed text-white"
            : "bg-violet-light text-violet-pressed"
        }`}
      >
        <span>{candidate.candidateName}</span>
        <span>{candidate.voteCount}</span>
      </div>
    </div>
  );
};

export default VoteResultItem;
