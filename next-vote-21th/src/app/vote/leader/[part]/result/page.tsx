"use client";

import { useParams } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import BackgroundShapes from "@/components/vote/BackgroundShape";

interface VoteCountItem {
  electionId: number;
  candidateName: string;
  candidateId: number;
  voteCount: number;
}

const partMap = {
  frontend: "FRONT_KING",
  backend: "BACK_KING",
} as const;

const LeaderVoteResult = () => {
  const params = useParams();
  const part = params.part as keyof typeof partMap;
  const sectionCode = partMap[part];

  const accessToken = useAuthStore(state => state.accessToken);

  const [voteCounts, setVoteCounts] = useState<VoteCountItem[]>([]);
  const [myVoteId, setMyVoteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;
  
      try {
        const electionRes = await fetch(
          `https://hanihome-vote.shop/api/v1/elections?section=${sectionCode}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        const electionData = await electionRes.json();
        const electionInfo = electionData.data?.[0];
        if (!electionInfo) return;
        const electionId = electionInfo.id;
  
        const resultsRes = await fetch(
          `https://hanihome-vote.shop/api/v1/elections/${electionId}/results`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        const resultsData = await resultsRes.json();
  
        const voteCountsData = resultsData.data?.voteCounts || [];
        setVoteCounts(voteCountsData);
  
        // 내 투표 정보 조회
        const myVoteRes = await fetch(
          `https://hanihome-vote.shop/api/v1/elections/${electionId}/my-vote`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        const myVoteData = await myVoteRes.json();
  
        if (myVoteData?.data?.voted) {
          setMyVoteId(myVoteData.data.candidate.id);
        }
      } catch (error) {
        console.error("투표 정보 불러오기 실패:", error);
      }
    };
  
    fetchData();
  }, [accessToken, sectionCode]);

  const sortedVoteList = useMemo(() => {
    return [...voteCounts].sort((a, b) => b.voteCount - a.voteCount);
  }, [voteCounts]);

  return (
    <div className="scrollbar-hide relative ml-[31px] flex min-h-screen w-screen flex-col justify-start overflow-auto pt-[128px] md:items-center md:justify-center">
      <BackgroundShapes />
      <div className="text-heading3 md:text-heading1 text-violet-dark">
        현재 {part === "frontend" ? "프론트엔드" : "백엔드"} 파트장 투표 순위
      </div>
      <div className="grid grid-cols-1 pt-[36px] md:grid-cols-3 md:pt-[56px]">
        {sortedVoteList.map((item, index) => {
          const isMyVote = item.candidateId === myVoteId;

          return (
            <div
              key={item.candidateId}
              className="flex items-center justify-start pb-[19px] md:mx-[28px] md:my-[19px] md:justify-center"
            >
              <div
                className={`text-heading2 md:text-heading1 text-violet-dark w-[33px] text-center ${
                  index === 9 ? "pr-[12px]" : "pr-[16px]"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`border-violet-dark text-body1-sb md:text-heading4 flex h-[41px] w-[114px] items-center justify-center gap-[5px] rounded-[24px] border md:h-[50px] md:w-[120px] ${
                  isMyVote
                    ? "bg-violet-pressed text-white"
                    : "bg-violet-light text-violet-pressed"
                }`}
              >
                <div>{item.candidateName}</div>
                <div>{item.voteCount}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderVoteResult;
