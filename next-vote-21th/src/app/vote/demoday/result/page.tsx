"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { fetchSortedCandidates, getMyVote } from "@/apis/vote";

import { useLoginGuard } from "@/hooks/useAuthGuard";

import BackgroundShapes from "@/components/vote/BackgroundShape";

import { ELECTION_ID } from "@/constants/electionIds";

import { VoteItem } from "@/types/vote/vote";

const DemodayVoteResult = () => {
  useLoginGuard();

  const [myVoteId, setMyVoteId] = useState<number | null>(null);
  const [voteResults, setVoteResults] = useState<VoteItem[]>([]);

  const accessToken = useAuthStore(s => s.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    const fetchVotes = async () => {
      try {
        const myVoteRes = await getMyVote(ELECTION_ID.DEMO_DAY);
        setMyVoteId(myVoteRes?.candidate?.id ?? null);

        const sortedCandidates = await fetchSortedCandidates(
          ELECTION_ID.DEMO_DAY,
        );
        setVoteResults(sortedCandidates);
      } catch (err) {
        console.error("투표 결과 불러오기 실패:", err);
      }
    };

    fetchVotes();
  }, [accessToken]);

  return (
    <div className="scrollbar-hide relative flex min-h-screen w-screen flex-col justify-center overflow-x-hidden overflow-y-auto md:items-center md:justify-center">
      <BackgroundShapes />

      <div className="text-heading3 md:text-heading1 text-green-dark min-w-[290px] self-center">
        현재 데모데이 투표 순위
      </div>

      <div className="flex flex-col items-center gap-4 pt-[36px] md:pt-[56px]">
        {voteResults.map((team, index) => {
          const isMyVote = team.candidateId === myVoteId;

          const itemClass = `flex h-11 w-[261px] items-center justify-center gap-[7px] rounded-[24px] border border-green-dark text-body1-sb md:text-heading4 ${
            isMyVote ? "bg-green text-white" : "bg-green-light text-green-dark"
          }`;

          return (
            <div
              key={team.candidateId}
              className="flex items-center justify-start gap-[13px] md:justify-center md:gap-[22px]"
            >
              <div className="text-heading2 md:text-heading1 text-green-dark">
                {index + 1}
              </div>
              <div className={itemClass}>
                <div>{team.name}</div>
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
