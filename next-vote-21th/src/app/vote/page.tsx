"use client";

import { useRouter } from "next/navigation";

import BackgroundShapes from "@/components/vote/BackgroundShape";

type Part = "frontend" | "backend" | "demoday";
const VotePage = () => {
  const router = useRouter();

  const handleClick = (part: Part) => {
    if (part === "demoday") {
      router.push(`vote/${part}`);
    } else {
      router.push(`vote/leader/${part}`);
    }
  };

  return (
    <div className="md: mt-25 flex min-h-screen w-screen flex-col items-start pl-0 pl-[31px] md:mt-16 md:items-center md:justify-center">
      <BackgroundShapes />
      <div className="text-heading3 text-left">VOTE</div>
      <div className="flex flex-col gap-5 pt-[27px]">
        <div className="text-violet-pressed text-heading1">파트장 투표</div>
        <button
          onClick={() => handleClick("frontend")}
          className="text-heading3 border-violet-dark text-violet-dark bg-violet-light flex h-11 w-[218px] cursor-pointer items-center justify-center gap-[14px] rounded-[24px] border border-solid"
        >
          <div>프론트엔드 파트장</div>
          <div>&gt;</div>
        </button>
        <button
          onClick={() => handleClick("backend")}
          className="text-heading3 border-violet-dark text-violet-dark bg-violet-light flex h-11 w-[218px] cursor-pointer items-center justify-center gap-[14px] rounded-[24px] border border-solid"
        >
          <div>백엔드 파트장</div>
          <div>&gt;</div>
        </button>
      </div>
      <div className="flex flex-col gap-5 pt-[35px]">
        <div className="text-green-dark text-heading1">데모데이 투표</div>
        <button
          onClick={() => handleClick("demoday")}
          className="text-heading3 border-green-dark text-green-dark bg-green-light flex h-11 w-[218px] cursor-pointer items-center justify-center gap-[14px] rounded-[24px] border border-solid"
        >
          <div>데모데이</div>
          <div>&gt;</div>
        </button>
      </div>
    </div>
  );
};

export default VotePage;
