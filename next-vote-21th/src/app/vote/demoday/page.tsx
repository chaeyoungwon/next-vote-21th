"use client";

import { useState } from "react";

import clsx from "clsx";

import VoteModal from "@/components/common/VoteModal";

import { teamList } from "@/constants/signup/teamLists";

const DemodayVotePage = () => {
  const teamNames = teamList.map(team => team.name);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (team: string | null) => {
    if (!team) return;
    // TODO: 여기에 투표 처리 로직 (API 호출 등) 작성
    console.log(`${team} 팀에 투표 완료`);
    setHasVoted(true);
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center pt-16">
      <div className="mt-[152px] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-center">
          <div className="mb-7 ml-[-26px] flex items-center justify-center gap-9 text-center md:ml-[-52px]">
            <div className="text-heading3 md:text-heading1 text-green-dark">
              21th CEOS PROJECT
            </div>
            <span
              onClick={() => !hasVoted && setIsModalOpen(true)}
              className={clsx(
                "text-lab1-b md:text-body1-sb cursor-pointer underline transition-opacity duration-200",
                hasVoted && "pointer-events-none opacity-0",
              )}
            >
              투표하기
            </span>
          </div>
        </div>

        {/* 팀 리스트 */}
        <div className="flex flex-col gap-4">
          {teamNames.map(team => (
            <div
              key={team}
              onClick={() => {
                setSelectedTeam(team);
              }}
              className={clsx(
                "text-heading3 flex h-[44px] w-[261px] cursor-pointer items-center justify-center rounded-3xl border md:h-[50px]",
                "border-green-dark",
                selectedTeam === team
                  ? "bg-green text-white"
                  : "bg-green-light text-green-dark hover:bg-green hover:text-white",
              )}
            >
              {team}
            </div>
          ))}
        </div>
        {isModalOpen && selectedTeam && (
          <VoteModal
            target={selectedTeam}
            targetType="팀"
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => handleVote(selectedTeam)}
          />
        )}
      </div>
    </div>
  );
};

export default DemodayVotePage;
