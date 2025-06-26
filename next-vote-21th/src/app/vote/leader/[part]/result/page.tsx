"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import {
  fetchElectionInfo,
  fetchSortedCandidates,
  getMyVote,
} from "@/apis/vote";

import { useLoginGuard } from "@/hooks/useAuthGuard";

import BackgroundShapes from "@/components/vote/BackgroundShape";
import VoteResultItem from "@/components/vote/VoteResultItem";

import { VoteItem } from "@/types/vote/vote";

const partMap = {
  frontend: "FRONT_KING",
  backend: "BACK_KING",
} as const;

const LeaderVoteResult = () => {
  useLoginGuard();

  const accessToken = useAuthStore(s => s.accessToken);
  const { part } = useParams() as { part: keyof typeof partMap };
  const sectionCode = partMap[part];

  const [voteCounts, setVoteCounts] = useState<VoteItem[]>([]);
  const [myVoteId, setMyVoteId] = useState<number | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const loadVoteData = async () => {
      try {
        const electionInfo = await fetchElectionInfo(sectionCode);
        if (!electionInfo) return;

        const [votes, myVote] = await Promise.all([
          fetchSortedCandidates(electionInfo.id),
          getMyVote(electionInfo.id),
        ]);

        setVoteCounts(votes);
        setMyVoteId(myVote?.voted ? myVote.candidate.id : null);
      } catch (err) {
        console.error("투표 정보 불러오기 실패:", err);
      }
    };

    loadVoteData();
  }, [sectionCode, accessToken]);

  const getPartLabel = (p: keyof typeof partMap) =>
    p === "frontend" ? "프론트엔드" : "백엔드";

  return (
    <div className="scrollbar-hide relative ml-[31px] flex min-h-screen w-screen flex-col justify-start overflow-auto pt-[128px] md:items-center md:justify-center">
      <BackgroundShapes />
      <div className="text-heading3 md:text-heading1 text-violet-dark">
        현재 {getPartLabel(part)} 파트장 투표 순위
      </div>
      <div className="grid grid-cols-1 pt-[36px] md:grid-cols-3 md:pt-[56px]">
        {voteCounts.map((item, index) => {
          const mappedItem = {
            ...item,
            candidateName: item.name,
          };

          return (
            <VoteResultItem
              key={item.candidateId}
              rank={index + 1}
              candidate={mappedItem}
              isMyVote={item.candidateId === myVoteId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LeaderVoteResult;
