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
    <div className="scrollbar-hide flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <div className="flex w-[313px] flex-col items-center md:w-[386px]">
        <div className="text-heading3 md:text-heading1 text-green-dark flex w-full self-baseline pb-[15px] md:pb-[27px]">
          Members
        </div>

        {/* 파트 버튼 */}
        <div className="border-green flex h-[44px] w-[314px] overflow-hidden rounded-[20px] border border-solid focus:outline-none md:h-[55px] md:w-[386px]">
          {parts.map(part => (
            <button
              key={part}
              className={`text-heading3 flex h-full w-1/2 cursor-pointer items-center justify-center transition-colors duration-200 ${selectedPart === part ? "bg-green text-gray-0" : "bg-gray-0 text-green"}`}
              onClick={() => setSelectedPart(part)}
            >
              {part}
            </button>
          ))}
        </div>

        {/*멤버 데이터*/}
        <div className="grid w-[279px] grid-cols-2 gap-x-[19px] gap-y-[16px] pt-[25px] md:w-[381px] md:gap-x-[26px] md:gap-y-[21px] md:pt-[22px]">
          {entries.map(([name, { college }]) => (
            <div
              key={name}
              className="border-green flex h-[50px] w-[130px] flex-row items-center gap-2 rounded-lg border border-solid bg-gray-100 px-[9px] py-[7px] md:h-[62px] md:w-[180px] md:gap-[12.15px] md:px-[15px]"
            >
              <Profile className="h-[36px] w-[36px] md:h-[50px] md:w-[50px]" />
              <div className="flex flex-col gap-[2px] md:gap-1">
                <div className="md:text-lab1-b text-cap1-med text-[10px] text-gray-800">
                  {name}
                </div>
                <div className="md:text-cap1-b text-green-dark text-cap1-med text-[10px]">
                  {college}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MembersPage;
