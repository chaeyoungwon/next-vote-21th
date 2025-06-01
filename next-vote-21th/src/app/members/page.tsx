"use client";

import { useState } from "react";

import MemberCard from "@/components/member/MemberCard";

import { MEMBER_MAP, Part } from "@/constants/memberData";

const MembersPage = () => {
  const parts = Object.keys(MEMBER_MAP) as Part[];
  const [selectedPart, setSelectedPart] = useState<Part>(parts[0]);
  const members = Object.entries(MEMBER_MAP[selectedPart]);

  return (
    <div className="scrollbar-hide flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <div className="flex w-[313px] flex-col items-center md:w-[386px]">
        <h1 className="text-heading3 md:text-heading1 text-green-dark flex w-full self-baseline pb-[15px] md:pb-[27px]">
          Members
        </h1>

        <div className="border-green flex h-[44px] w-[314px] overflow-hidden rounded-[20px] border border-solid md:h-[55px] md:w-[386px]">
          {parts.map(part => (
            <button
              key={part}
              onClick={() => setSelectedPart(part)}
              className={`text-heading3 flex h-full w-1/2 items-center justify-center transition-colors duration-200 ${
                selectedPart === part
                  ? "bg-green text-gray-0"
                  : "bg-gray-0 text-green"
              }`}
            >
              {part}
            </button>
          ))}
        </div>

        <div className="grid w-[279px] grid-cols-2 gap-x-[19px] gap-y-[16px] pt-[25px] md:w-[381px] md:gap-x-[26px] md:gap-y-[21px] md:pt-[22px]">
          {members.map(([name, { college }]) => (
            <MemberCard key={name} name={name} college={college} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
