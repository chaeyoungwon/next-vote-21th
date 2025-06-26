"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import clsx from "clsx";

import { submitVote } from "@/apis/submitVote";

import { getCandidateIdByName } from "@/utils/getCandidateIdByName";

import VoteModal from "@/components/common/VoteModal";
import BackgroundShapes from "@/components/vote/BackgroundShape";

import { MEMBER_MAP } from "@/constants/memberData";

import { Part } from "@/types/part/part";

const dataMap: Record<Part, Record<string, { college: string }>> = {
  frontend: MEMBER_MAP["Front-End"],
  backend: MEMBER_MAP["Back-End"],
};

const titleMap: Record<Part, string> = {
  frontend: "21TH FRONT-END",
  backend: "21TH BACK-END",
};

const LeaderVotePage = () => {
  const params = useParams();
  const part = params.part as Part;
  const accessToken = useAuthStore(state => state.accessToken);

  const title = titleMap[part];
  const candidates = Object.keys(dataMap[part]);

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

    const section = part === "frontend" ? "FRONT_KING" : "BACK_KING";

    try {
      await submitVote({
        section,
        selectedCandidateId: candidateId,
      });

      setHasVoted(true);
      setIsModalOpen(false);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "투표 중 오류가 발생했습니다.";
      alert(message);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchMyVote = async () => {
      if (!accessToken) return;

      const section = part === "frontend" ? "FRONT_KING" : "BACK_KING";
      const res = await fetch(
        `https://hanihome-vote.shop/api/v1/elections?section=${section}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      const data = await res.json();
      const electionId = data.data[0]?.id;

      const voteRes = await fetch(
        `https://hanihome-vote.shop/api/v1/elections/${electionId}/my-vote`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const voteData = await voteRes.json();

      if (voteData?.data?.voted) {
        setHasVoted(true);
        const votedName = Object.keys(dataMap[part]).find(
          name => getCandidateIdByName(name) === voteData.data.candidate.id,
        );
        if (votedName) setSelectedCandidate(votedName);
      }
    };

    fetchMyVote();
  }, [accessToken, part]);

  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-auto scrollbar-hide">
      <BackgroundShapes />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row justify-center gap-[47px] pb-7">
          <div className="text-heading3 md:text-heading1 text-violet-pressed">
            {title}
          </div>
          <button
            onClick={() => !hasVoted && setIsModalOpen(true)}
            disabled={!selectedCandidate || hasVoted}
            className={`text-lab1-sb underline transition-opacity duration-200 ${
              hasVoted
                ? "pointer-events-none opacity-0"
                : selectedCandidate
                  ? "cursor-pointer text-black"
                  : "cursor-not-allowed text-gray-700"
            }`}
          >
            투표하기
          </button>
        </div>

        {/* 후보 목록 */}
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
                onClick={() => {
                  if (!hasVoted) setSelectedCandidate(name);
                }}
                className={buttonClass}
              >
                {name}
              </button>
            );
          })}
        </div>

        <Link
          className="text-heading3 md:text-heading2 text-violet-pressed flex self-end pt-[45px]"
          href={`/vote/leader/${part}/result`}
        >
          현재 투표 순위 보러 가기 &gt;
        </Link>

        {isModalOpen && selectedCandidate && (
          <VoteModal
            target={selectedCandidate}
            targetType="파트장"
            onConfirm={() => {
              handleVote(selectedCandidate);
            }}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LeaderVotePage;
