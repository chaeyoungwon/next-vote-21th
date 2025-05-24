"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

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
  const router = useRouter();

  const part = params.part as Part;

  // 예외 처리: part 값이 잘못된 경우
  if (part !== "frontend" && part !== "backend") {
    return <div>잘못된 경로입니다.</div>;
  }

  const title = titleMap[part];
  const candidates = Object.keys(dataMap[part]);

  const [isSelected, setIsSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVote = () => {
    if (!isSelected) return;
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    // 투표 처리 로직 추가 가능
    // 예시: 서버로 POST 요청 후 결과 페이지로 이동
    router.push(`/vote/leader/${part}/result`);
  };

  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <BackgroundShapes />

      <div className="flex flex-row gap-[47px] pb-7">
        <div className="text-heading3 md:text-heading1 text-violet-pressed">
          {title}
        </div>
        <button
          onClick={handleVote}
          disabled={!isSelected}
          className={`text-lab1-sb underline ${
            isSelected
              ? "cursor-pointer text-black"
              : "cursor-not-allowed text-gray-700"
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
            className={`text-heading3 border-violet-pressed h-[41px] w-[114px] cursor-pointer rounded-[24px] border md:h-[50px] md:w-[120px] ${
              isSelected === name
                ? "bg-violet-pressed text-white"
                : "bg-violet-light text-violet-pressed hover:bg-violet-pressed hover:text-white"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <Link
        className="text-heading3 md:text-heading2 text-violet-pressed ml-[106px] pt-[45px] text-right max-md:ml-[-108px]"
        href={`/vote/leader/${part}/result`}
      >
        현재 투표 순위 보러 가기 &gt;
      </Link>

      {isModalOpen && (
        <VoteModal
          onConfirm={handleConfirm}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default LeaderVotePage;
