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
    <div className="flex min-h-screen w-screen flex-col items-center max-md:mt-31 md:justify-center">
      <BackgroundShapes />
      <div className="flex w-[218px] flex-col max-md:ml-[-108px]">
        <div className="text-heading3 md:text-heading1 text-left">VOTE</div>
        <div className="flex flex-col gap-5 pt-[27px]">
          <div className="text-violet-pressed text-heading3 md:text-heading1">
            파트장 투표
          </div>
          <button
            onClick={() => handleClick("frontend")}
            className="text-heading3 border-violet-dark text-violet-dark bg-violet-light relative flex h-11 w-[218px] cursor-pointer items-center justify-center gap-[14px] rounded-[24px] border border-solid"
          >
            <div>프론트엔드 파트장</div>
            <div className="absolute top-1/2 right-[19px] -translate-y-1/2">
              &gt;
            </div>
          </button>
          <button
            onClick={() => handleClick("backend")}
            className="text-heading3 border-violet-dark text-violet-dark bg-violet-light relative flex h-11 w-[218px] cursor-pointer items-center justify-center gap-[14px] rounded-[24px] border border-solid"
          >
            <div>백엔드 파트장</div>
            <div className="absolute top-1/2 right-[19px] -translate-y-1/2">
              &gt;
            </div>
          </button>
        </div>
        <div className="flex flex-col gap-5 pt-[35px]">
          <div className="text-green-dark text-heading3 md:text-heading1">
            데모데이 투표
          </div>
          <button
            onClick={() => handleClick("demoday")}
            className="text-heading3 border-green-dark text-green-dark bg-green-light relative flex h-11 w-[218px] cursor-pointer items-center justify-center gap-[14px] rounded-[24px] border border-solid"
          >
            <div>데모데이</div>
            <div className="absolute top-1/2 right-[19px] -translate-y-1/2">
              &gt;
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotePage;
