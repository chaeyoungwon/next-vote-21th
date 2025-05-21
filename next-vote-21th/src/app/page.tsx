import Link from "next/link";

import GreenShape from "@/public/svgs/home/greenShape.svg";
import MainShape from "@/public/svgs/home/mainShape.svg";
import VioletShape from "@/public/svgs/home/violetShape.svg";

const HomePage = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden pt-16">
      <div className="flex h-full flex-col items-center">
        <GreenShape className="animate-fade-in-left absolute top-[86px] left-[-10%] z-[-1] opacity-0 transition-all duration-700 ease-out md:top-[119px] md:left-[150px] md:scale-150" />
        <VioletShape className="animate-fade-in-right absolute top-[306px] right-[-10%] z-[-1] opacity-0 transition-all duration-700 ease-out md:right-[110px] md:scale-150" />
        <MainShape className="animate-fade-in-up absolute bottom-0 left-0 z-[-1] opacity-0 transition-all delay-[300ms] duration-700 ease-out max-md:hidden" />

        {/* 타이틀 */}
        <div className="mt-[203px] ml-[-63px] flex flex-col md:mt-[142px] md:ml-0">
          <span className="text-heading1 md:!text-[2.5rem]">
            🏆 <span className="text-violet-dark">2025</span> CEOS
          </span>
          <span className="text-heading1 md:ml-[131px] md:!text-[2.5rem]">
            21TH AWARDS
          </span>

          {/* 투표 종류 */}
          <div className="mt-[132px] flex flex-col gap-2 md:mt-[70px] md:gap-3 md:self-center">
            <div className="text-body1-sb border-green bg-green-light text-green h-9 w-fit rounded-3xl border px-[10px] py-[7px] md:h-[54px] md:px-[23px] md:py-[11px] md:!text-2xl">
              투표 분야
            </div>
            <span className="text-body1-sb text-black md:!text-2xl">
              # 프론트엔드 파트장 투표
            </span>
            <span className="text-body1-sb text-black md:!text-2xl">
              # 백엔드 파트장 투표
            </span>
            <span className="text-body1-sb text-black md:!text-2xl">
              # 데모데이 투표
            </span>
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-[91px] flex flex-col items-center justify-center gap-4 md:mt-[67px]">
          <Link href="/vote">
            <button className="text-heading2 border-violet bg-violet-light text-violet-pressed hover:border-violet-dark hover:bg-violet hover:text-gray-0 shadow-button h-12 w-fit cursor-pointer rounded-3xl border px-[26px] py-[11px] md:h-[54px] md:px-[21px] md:py-[9px] md:!text-2xl">
              투표하러 가기
            </button>
          </Link>
          <span className="text-body1-med text-violet-dark">
            현재 총 20건의 투표가 진행되었어요!
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
