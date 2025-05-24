"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useState } from "react";

import VoteModal from "@/components/common/VoteModal";
import BackgroundShapes from "@/components/vote/BackgroundShape";

import { BE, FE } from "@/constants/memberData";

type Part = "frontend" | "backend";

const dataMap: Record<Part, Record<string, { college: string }>> = {
  frontend: FE,
  backend: BE,
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVote = () => {
    if (!selectedCandidate) return;
    setIsModalOpen(true);
  };

  return (
    <div className="mt-16 flex min-h-screen w-screen flex-col items-center justify-center">
      <BackgroundShapes />

      {/* 헤더 + 투표하기 버튼 */}
      <div className="flex flex-row gap-[47px] pb-7">
        <div className="text-heading1 text-violet-pressed">{title}</div>
        <button
          onClick={handleVote}
          disabled={!selectedCandidate}
          className={`underline ${
            selectedCandidate
              ? "cursor-pointer text-black"
              : "cursor-not-allowed text-gray-400"
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
            className={`text-heading3 border-violet-pressed h-[50px] w-[120px] cursor-pointer rounded-[24px] border ${
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
        className="text-heading2 text-violet-pressed pt-[45px]"
        href={`/vote/leader/${part}/result`}
      >
        현재 투표 순위 보러 가기 &gt;
      </Link>

      {/* 투표 확인 모달 */}
      {isModalOpen && selectedCandidate && (
        <VoteModal
          target={selectedCandidate}
          targetType="파트장"
          onConfirm={() => {
            setIsModalOpen(false);
            // TODO: 실제 투표 API 호출 예정
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default LeaderVotePage;
