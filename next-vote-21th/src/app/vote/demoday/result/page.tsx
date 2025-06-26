"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import BackgroundShapes from "@/components/vote/BackgroundShape";

const DemodayVoteResult = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const [myVoteId, setMyVoteId] = useState<number | null>(null);
  const [voteResults, setVoteResults] = useState<VoteResult[]>([]);

  type VoteResult = {
    candidateId: number;
    candidateName: string;
    voteCount: number;
  };
  useEffect(() => {
    const fetchVotes = async () => {
      const myVoteRes = await fetch(
        "https://hanihome-vote.shop/api/v1/elections/1/my-vote",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const myVoteData = await myVoteRes.json();
      setMyVoteId(myVoteData.data.candidate.id);

      const resultsRes = await fetch(
        "https://hanihome-vote.shop/api/v1/elections/1/results",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const resultsData = await resultsRes.json();
      setVoteResults(resultsData.data.voteCounts);
    };
    fetchVotes();
  }, [accessToken]);

  const sortedList = [...voteResults].sort((a, b) => b.voteCount - a.voteCount);

  return (
    <div className="scrollbar-hide relative ml-[31px] flex min-h-screen w-screen flex-col justify-start overflow-auto pt-[128px] md:items-center md:justify-center">
      <BackgroundShapes />

      <div className="text-heading3 md:text-heading1 text-green-dark">
        현재 데모데이 투표 순위
      </div>

      <div className="flex flex-col gap-4 pt-[36px] md:pt-[56px]">
        {sortedList.map((team, index) => {
          const isMyVote = team.candidateId === myVoteId;
          return (
            <div
              key={team.candidateId}
              className="flex items-center justify-start gap-[13px] md:justify-center md:gap-[22px]"
            >
              <div className="text-heading2 md:text-heading1 text-green-dark">
                {index + 1}
              </div>
              <div
                className={`border-green-dark text-body1-sb md:text-heading4 flex h-11 w-[261px] items-center justify-center gap-[7px] rounded-[24px] border ${isMyVote ? "bg-green text-white" : "bg-green-light text-green-dark"}`}
              >
                <div>{team.candidateName}</div>
                <div>{team.voteCount}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DemodayVoteResult;
