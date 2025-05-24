"use client";

import Link from "next/link";

import { useState } from "react";

import VoteModal from "@/components/common/VoteModal";

import { BE, FE } from "@/constants/memberData";
import BackgroundShapes from "@/components/vote/BackgroundShape";

type Part = "frontend" | "backend";

interface LeaderPageProps {
  params: { part: Part };
}

const dataMap: Record<Part, Record<string, { college: string }>> = {
  frontend: FE,
  backend: BE,
};

const titleMap: Record<Part, string> = {
  frontend: "21TH FRONT-END",
  backend: "21TH BACK-END",
};

const LeaderVotePage = ({ params }: LeaderPageProps) => {
  const { part } = params;
  const title = titleMap[part];
  const candidates = Object.keys(dataMap[part]);

  const [isSelected, setIsSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVote = () => {
    if (!isSelected) return;
    setIsModalOpen(true);
  };

  return (
    <div className="mt-16 flex min-h-screen w-screen flex-col items-center justify-center">
      <BackgroundShapes/>
      <div className="flex flex-row gap-[47px] pb-7">
        <div className="text-heading1 text-violet-pressed">{title}</div>
        <button
          onClick={handleVote}
          disabled={!isSelected}
          className={`underline ${
            isSelected
              ? "cursor-pointer text-black"
              : "cursor-not-allowed text-gray-400"
          }`}
        >
          투표하기
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-[21px] gap-y-[7px]">
        {candidates.map(name => (
          <button
            key={name}
            onClick={() => setIsSelected(name)}
            className={`cursor-pointer text-heading3 border-violet-pressed h-[50px] w-[120px] rounded-[24px] border ${
              isSelected === name
                ? "bg-violet-pressed text-white"
                : "bg-violet-light text-violet-pressed hover:bg-violet-pressed hover:text-white"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <Link className="pt-[45px] text-heading2 text-violet-pressed " href={`/vote/leader/${part}/result`}>
        현재 투표 순위 보러 가기 &gt;
      </Link>

      {isModalOpen && (
        <VoteModal
          onConfirm={() => {
            setIsModalOpen(false);
          }}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default LeaderVotePage;
