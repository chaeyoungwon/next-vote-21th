import Profile from "@/public/svgs/members/profile.svg";

interface MemberCardProps {
  name: string;
  college: string;
}

const MemberCard = ({ name, college }: MemberCardProps) => {
  return (
    <div className="border-green flex h-[50px] w-[130px] items-center gap-2 rounded-lg border border-solid bg-gray-100 px-[9px] py-[7px] md:h-[62px] md:w-[180px] md:gap-[12.15px] md:px-[15px]">
      <Profile className="h-[36px] w-[36px] md:h-[50px] md:w-[50px]" />
      <div className="flex flex-col gap-[2px] md:gap-1">
        <span className="text-cap1-med md:text-lab1-b text-[10px] text-gray-800">
          {name}
        </span>
        <span className="text-cap1-med text-green-dark md:text-cap1-b text-[10px]">
          {college}
        </span>
      </div>
    </div>
  );
};

export default MemberCard;
