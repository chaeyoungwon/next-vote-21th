"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { useCountNum } from "@/hooks/useCountNum";

import { getTotalVotes } from "@/utils/getTotalVotes";

import LoginModal from "@/components/common/LoginModal";
import BackgroundShapes from "@/components/home/BackgroundShape";
import VoteCategoryList from "@/components/home/VoteCategoryList";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState<number>(0);

  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("/vote");
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const value = await getTotalVotes();
      setTotal(value);
    };
    loadData();
  }, []);

  return (
    <div className="scrollbar-hide relative min-h-screen w-screen overflow-x-hidden">
      <div className="flex h-screen flex-col items-center pt-16">
        <BackgroundShapes />

        {/* 타이틀 */}
        <div className="mt-[203px] ml-[50px] flex flex-col self-baseline md:mt-[142px] md:ml-0 md:self-center">
          <span className="text-heading1 md:text-[2.5rem]">
            🏆 <span className="text-violet-dark">2025</span> CEOS
          </span>
          <span className="text-heading1 md:ml-[131px] md:text-[2.5rem]">
            21TH AWARDS
          </span>

          <VoteCategoryList />
        </div>

        {/* 버튼 */}
        <div className="mt-[91px] flex w-full flex-col items-center justify-center gap-4 max-md:pb-16 md:mt-[67px]">
          <button
            onClick={handleClick}
            className="text-heading2 border-violet bg-violet-light text-violet-pressed hover:border-violet-dark hover:bg-violet hover:text-gray-0 shadow-button h-12 w-fit cursor-pointer rounded-3xl border px-[26px] py-[11px] md:h-[54px] md:px-[21px] md:py-[9px] md:text-2xl"
          >
            투표하러 가기
          </button>
          <span className="text-body1-med text-violet-dark">
            현재 총 {useCountNum(total)}건의 투표가 진행되었어요!
          </span>
        </div>
      </div>

      {/* 로그인 모달 */}
      {isModalOpen && (
        <LoginModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            setIsModalOpen(false);
            router.push("/login");
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
