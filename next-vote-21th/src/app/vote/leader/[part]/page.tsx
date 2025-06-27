"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import clsx from "clsx";

import { submitVote } from "@/apis/vote";
import { fetchElectionInfo, getMyVote } from "@/apis/vote";

import { useLoginGuard } from "@/hooks/useAuthGuard";

import { getCandidateIdByName } from "@/utils/getCandidateIdByName";

import VoteModal from "@/components/common/VoteModal";
import BackgroundShapes from "@/components/vote/BackgroundShape";

import { MEMBER_MAP } from "@/constants/memberData";

import type { PartType } from "@/types/part/part";

const dataMap: Record<PartType, Record<string, { college: string }>> = {
  frontend: MEMBER_MAP["Front-End"],
  backend: MEMBER_MAP["Back-End"],
};

const sectionMap = {
  frontend: "FRONT_KING",
  backend: "BACK_KING",
} as const;

const titleMap: Record<PartType, string> = {
  frontend: "21TH FRONT-END",
  backend: "21TH BACK-END",
};

const LeaderVotePage = () => {
  useLoginGuard();

  const { part } = useParams() as { part: PartType };

  const candidates = Object.keys(dataMap[part]);
  const sectionCode: "FRONT_KING" | "BACK_KING" = sectionMap[part];
  const title = titleMap[part];

  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null,
  );
  const [hasVoted, setHasVoted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVote = async (candidate: string | null) => {
    if (!candidate) return;

    const candidateId = getCandidateIdByName(candidate);
    if (!candidateId) {
      alert("후보 ID를 찾을 수 없습니다.");
      return;
    }

    try {
      await submitVote({
        section: sectionCode,
        selectedCandidateId: candidateId,
      });
      setHasVoted(true);
      setIsModalOpen(false);
    } catch (error: unknown) {
      let message = "투표 중 오류가 발생했습니다.";

      if (typeof error === "object" && error !== null && "response" in error) {
        const res = (error as { response: { data?: { message?: string } } })
          .response;
        if (res.data?.message) {
          message = res.data.message;
        }
      }

      alert(message);
      setIsModalOpen(false);
    }
  };

  const loadVoteInfo = async () => {
    try {
      const electionInfo = await fetchElectionInfo(sectionCode);
      if (!electionInfo) return;

      const voteData = await getMyVote(electionInfo.id);

      if (voteData?.voted) {
        setHasVoted(true);
        const votedName = candidates.find(
          name => getCandidateIdByName(name) === voteData.candidate.id,
        );
        if (votedName) setSelectedCandidate(votedName);
      }
    } catch (err) {
      console.error("내 투표 정보 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    loadVoteInfo();
  }, [part]);

  return (
    <div className="scrollbar-hide relative flex min-h-screen w-screen flex-col items-center justify-center overflow-auto">
      <BackgroundShapes />
      <div className="flex flex-col items-center justify-center">
        {/* 타이틀 + 투표하기 버튼 */}
        <div className="flex flex-row justify-center gap-[47px] pb-7">
          <h1 className="text-heading3 md:text-heading1 text-violet-pressed">
            {title}
          </h1>
          <button
            onClick={() => !hasVoted && setIsModalOpen(true)}
            disabled={!selectedCandidate || hasVoted}
            className={clsx(
              "text-lab1-sb underline transition-opacity duration-200",
              {
                "pointer-events-none opacity-0": hasVoted,
                "cursor-not-allowed text-gray-700":
                  !selectedCandidate && !hasVoted,
                "cursor-pointer text-black": selectedCandidate && !hasVoted,
              },
            )}
          >
            투표하기
          </button>
        </div>

        {/* 후보 버튼들 */}
        <div className="grid grid-cols-2 gap-x-[21px] gap-y-[7px]">
          {candidates.map(name => {
            const isSelected = selectedCandidate === name;
            const buttonClass = clsx(
              "text-heading3 border-violet-pressed h-[41px] w-[114px] rounded-[24px] border md:h-[50px] md:w-[120px]",
              {
                // 투표 후: 선택한 후보만 강조
                "bg-violet-pressed text-white cursor-default":
                  hasVoted && isSelected,
                "bg-violet-light text-violet-pressed cursor-default":
                  hasVoted && !isSelected,
                // 투표 전: 선택한 후보 강조, 나머지 hover
                "bg-violet-pressed text-white cursor-pointer":
                  !hasVoted && isSelected,
                "bg-violet-light text-violet-pressed hover:bg-violet-pressed hover:text-white cursor-pointer":
                  !hasVoted && !isSelected,
              },
            );

            return (
              <button
                key={name}
                onClick={() => !hasVoted && setSelectedCandidate(name)}
                className={buttonClass}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* 투표 결과 링크 */}
        <Link
          className="text-heading3 md:text-heading2 text-violet-pressed flex self-end pt-[45px]"
          href={`/vote/leader/${part}/result`}
        >
          현재 투표 순위 보러 가기 &gt;
        </Link>

        {/* 모달 */}
        {isModalOpen && selectedCandidate && (
          <VoteModal
            target={selectedCandidate}
            targetType="파트장"
            onConfirm={() => handleVote(selectedCandidate)}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LeaderVotePage;
