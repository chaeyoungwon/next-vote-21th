"use client";

import { useState } from "react";

import { BE, FE } from "@/constants/memberData";

import Profile from "@/public/svgs/members/profile.svg";

const MembersPage = () => {
  const [selectedPart, setSelectedPart] = useState("Front-End");
  const parts = ["Front-End", "Back-End"];

  const memberData = selectedPart === "Front-End" ? FE : BE;
  const entries = Object.entries(memberData);
  return (
    <div className="scrollbar-hide mt-16 flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <div className="text-heading1 text-green-dark pb-[15px] md:pb-[27px]">Members</div>

      {/* 파트 버튼 */}
      <div className="border-green flex h-[44px] md:w-[388px] w-[314px] overflow-hidden rounded-[20px] border">
        {parts.map(part => (
          <button
            key={part}
            className={`text-heading3 flex h-full w-1/2 items-center justify-center transition-colors duration-200 ${selectedPart === part ? "bg-green text-gray-0" : "bg-gray-0 text-green"}`}
            onClick={() => setSelectedPart(part)}
          >
            {part}
          </button>
        ))}
      </div>

      {/*멤버 데이터*/}
      <div className="grid grid-cols-2 gap-x-[19px] md:gap-x-[26px] gap-y-[16px] md:gap-y-[21px] pt-[25px] md:pt-[22px]">
        {entries.map(([name, { college }]) => (
          <div
            key={name}
            className="border-green flex  h-[50px] md:h-[62px]  w-[130px] md:w-[200px] flex-row items-center md:gap-[12.15px] gap-[8px] rounded-[8px] border px-[9px] md:px-[15px]"
          >
            <Profile className=" md:h-[50px] h-[36px] md:w-[50px] w-[36px]" />
            <div className="flex flex-col gap-y-[2px] md:gap-y-[4px]">
              <div className="md:text-lab1-b text-[10px] text-gray-800">{name}</div>
              <div className="md:text-cap1-b text-[10px] text-green-dark">{college}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MembersPage;
