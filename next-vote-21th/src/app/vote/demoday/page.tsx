"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import clsx from "clsx";

import { getMyVote, submitVote } from "@/apis/vote";

import { useLoginGuard } from "@/hooks/useAuthGuard";

import VoteModal from "@/components/common/VoteModal";
import BackgroundShapes from "@/components/vote/BackgroundShape";

import { ELECTION_ID } from "@/constants/electionIds";
import { teamList } from "@/constants/teamLists";

const DemodayVotePage = () => {
  useLoginGuard();

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async () => {
    if (!selectedTeam) return;

    const team = teamList.find(t => t.name === selectedTeam);
    if (!team) {
      alert("선택한 팀 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      await submitVote({
        section: "DEMO_DAY",
        selectedCandidateId: team.id,
      });
      alert(`${selectedTeam} 팀에 투표 완료`);
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
      try {
        const data = await getMyVote(ELECTION_ID.DEMO_DAY);
        if (data?.voted) {
          setHasVoted(true);
          const votedTeam = teamList.find(
            team => team.id === data.candidate.id,
          )?.name;
          if (votedTeam) setSelectedTeam(votedTeam);
        }
      } catch (error) {
        console.error("내 투표 조회 실패:", error);
      }
    };

    fetchMyVote();
  }, []);

  return (
    <div className="scrollbar-hide relative flex min-h-screen w-screen flex-col items-center justify-center overflow-auto">
      <BackgroundShapes />
      <div className="mt-[152px] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-center">
          <div className="mb-7 ml-[-26px] flex items-center justify-center gap-9 text-center md:ml-[-52px]">
            <div className="text-heading3 md:text-heading1 text-green-dark">
              21th CEOS PROJECT
            </div>
            <button
              onClick={() => !hasVoted && setIsModalOpen(true)}
              disabled={!selectedTeam || hasVoted}
              className={clsx(
                "text-lab1-b md:text-body1-sb underline transition-opacity duration-200",
                hasVoted
                  ? "pointer-events-none opacity-0"
                  : selectedTeam
                    ? "cursor-pointer text-black"
                    : "cursor-not-allowed text-gray-700",
              )}
            >
              투표하기
            </button>
          </div>
        </div>

        {/* 팀 리스트 */}
        <div className="flex flex-col gap-4">
          {teamList.map(({ name }) => {
            const isSelected = selectedTeam === name;
            const baseStyle =
              "text-heading3 flex h-[44px] w-[261px] items-center justify-center rounded-3xl border md:h-[50px] border-green-dark";
            const buttonStyle = clsx(baseStyle, {
              "bg-green text-white cursor-default": hasVoted && isSelected,
              "bg-green-light text-green-dark cursor-default":
                hasVoted && !isSelected,
              "bg-green text-white cursor-pointer": !hasVoted && isSelected,
              "bg-green-light text-green-dark hover:bg-green hover:text-white cursor-pointer":
                !hasVoted && !isSelected,
            });

            return (
              <div
                key={name}
                onClick={() => !hasVoted && setSelectedTeam(name)}
                className={buttonStyle}
              >
                {name}
              </div>
            );
          })}
        </div>

        {/* 결과 페이지 링크 */}
        <Link
          className="text-heading2 text-green-dark flex self-end pt-[45px]"
          href={`/vote/demoday/result`}
        >
          현재 투표 순위 보러 가기 &gt;
        </Link>

        {/* 모달 */}
        {isModalOpen && selectedTeam && (
          <VoteModal
            target={selectedTeam}
            targetType="팀"
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleVote}
          />
        )}
      </div>
    </div>
  );
};

export default DemodayVotePage;
