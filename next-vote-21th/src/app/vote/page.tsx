"use client";

import { useRouter } from "next/navigation";

import BackgroundShapes from "@/components/vote/BackgroundShape";
import VoteButton from "@/components/vote/VoteButton";

type Part = "frontend" | "backend" | "demoday";

const VotePage = () => {
  const router = useRouter();

  const handleClick = (part: Part) => {
    if (part === "demoday") {
      router.push(`vote/demoday`);
    } else {
      router.push(`vote/leader/${part}`);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden max-md:mt-31 md:justify-center">
      <BackgroundShapes />
      <div className="flex w-[218px] flex-col max-md:ml-[-108px]">
        <div className="text-heading3 md:text-heading1 text-left">VOTE</div>

        {/* 파트장 투표 */}
        <div className="flex flex-col gap-5 pt-[27px]">
          <div className="text-violet-pressed text-heading3 md:text-heading1">
            파트장 투표
          </div>
          <VoteButton
            onClick={() => handleClick("frontend")}
            text="프론트엔드 파트장"
            borderColor="border-violet-dark"
            textColor="text-violet-dark"
            bgColor="bg-violet-light"
          />
          <VoteButton
            onClick={() => handleClick("backend")}
            text="백엔드 파트장"
            borderColor="border-violet-dark"
            textColor="text-violet-dark"
            bgColor="bg-violet-light"
          />
        </div>

        {/* 데모데이 투표 */}
        <div className="flex flex-col gap-5 pt-[35px]">
          <div className="text-green-dark text-heading3 md:text-heading1">
            데모데이 투표
          </div>
          <VoteButton
            onClick={() => handleClick("demoday")}
            text="데모데이"
            borderColor="border-green-dark"
            textColor="text-green-dark"
            bgColor="bg-green-light"
          />
        </div>
      </div>
    </div>
  );
};

export default VotePage;
