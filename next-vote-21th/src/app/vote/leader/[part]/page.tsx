"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useState } from "react";

import VoteModal from "@/components/common/VoteModal";
import BackgroundShapes from "@/components/vote/BackgroundShape";

import { MEMBER_MAP } from "@/constants/memberData";

type Part = "frontend" | "backend";

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

  const title = titleMap[part];
  const candidates = Object.keys(dataMap[part]);

  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null,
  );
  const [hasVoted, setHasVoted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVote = (candidate: string | null) => {
    if (!candidate) return;
    setHasVoted(true);
    setIsModalOpen(false);
  };

  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <BackgroundShapes />

      <div className="flex flex-col items-center justify-center">
        {/* 헤더 + 투표하기 버튼 */}
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
          {candidates.map(name => (
            <button
              key={name}
              onClick={() => setSelectedCandidate(name)}
              className={`text-heading3 border-violet-pressed h-[41px] w-[114px] cursor-pointer rounded-[24px] border md:h-[50px] md:w-[120px] ${
                selectedCandidate === name
                  ? "bg-violet-pressed text-white"
                  : "bg-violet-light text-violet-pressed hover:bg-violet-pressed hover:text-white"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* 결과 페이지 이동 */}
        <Link
          className="text-heading3 md:text-heading2 text-violet-pressed flex self-end pt-[45px] text-right max-md:ml-[561x]"
          href={`/vote/leader/${part}/result`}
        >
          현재 투표 순위 보러 가기 &gt;
        </Link>
      </div>
      {/* 투표 확인 모달 */}
      {isModalOpen && selectedCandidate && (
        <VoteModal
          target={selectedCandidate}
          targetType="파트장"
          onConfirm={() => {
            handleVote(selectedCandidate);
            // TODO: 실제 투표 API 호출 예정
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default LeaderVotePage;
