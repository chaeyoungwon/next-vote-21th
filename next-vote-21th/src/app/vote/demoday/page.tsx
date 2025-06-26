"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import clsx from "clsx";

import { submitVote } from "@/apis/submitVote";

import VoteModal from "@/components/common/VoteModal";

import { teamList } from "@/constants/teamLists";

const DemodayVotePage = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const teamNames = teamList.map(team => team.name);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // 투표 버튼 클릭
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
      console.error("투표 에러:", error);
      const message =
        error?.response?.data?.message || "투표 중 오류가 발생했습니다.";
      alert(message);
      setIsModalOpen(false);
    }
  };

  // 내 투표 정보 불러오기
  useEffect(() => {
    const fetchMyVote = async () => {
      if (!accessToken) return;

      try {
        const res = await fetch(
          "https://hanihome-vote.shop/api/v1/elections/1/my-vote",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await res.json();

        if (data.data?.voted) {
          setHasVoted(true);

          const votedCandidateId = data.data.candidate.id;
          const votedTeam = teamList.find(
            team => team.id === votedCandidateId,
          )?.name;
          if (votedTeam) setSelectedTeam(votedTeam);
        }
      } catch (error) {
        console.error("내 투표 조회 실패:", error);
      }
    };

    fetchMyVote();
  }, [accessToken]);

  return (
    <div className="flex min-h-screen w-screen flex-col items-center pt-16">
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
          {teamNames.map(team => {
            const isSelected = selectedTeam === team;

            const buttonClass = clsx(
              "text-heading3 flex h-[44px] w-[261px] items-center justify-center rounded-3xl border md:h-[50px]",
              "border-green-dark",
              {
                // 투표 후: 선택한 팀만 강조
                "bg-green text-white cursor-default": hasVoted && isSelected,
                "bg-green-light text-green-dark cursor-default":
                  hasVoted && !isSelected,

                // 투표 전
                "bg-green text-white cursor-pointer": !hasVoted && isSelected,
                "bg-green-light text-green-dark hover:bg-green hover:text-white cursor-pointer":
                  !hasVoted && !isSelected,
              },
            );

            return (
              <div
                key={team}
                onClick={() => {
                  if (!hasVoted) setSelectedTeam(team);
                }}
                className={buttonClass}
              >
                {team}
              </div>
            );
          })}
        </div>

        {/* 결과 페이지 이동 */}
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
