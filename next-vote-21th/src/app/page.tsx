import MainShape from "@/public/svgs/common/mainShape.svg";
import GreenShape from "@/public/svgs/home/greenShape.svg";
import VioletShape from "@/public/svgs/home/violetShape.svg";

const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <GreenShape className="absolute top-[22px] left-[-57px] min-md:top-[120px] min-md:left-[171px]" />
      <VioletShape className="absolute top-[242px] right-[-72px] min-md:right-[135px]" />
      <MainShape className="absolute top-[471px] left-[-53px] max-md:hidden" />
      <div className="mt-[203px] ml-[-63px] flex flex-col min-md:mt-[142px]">
        <span className="text-heading1 min-md:!text-[40px]">
          🏆 <span className="text-violet-dark">2025</span> CEOS
        </span>
        <span className="text-heading1 min-md:!text-[40px]">21TH AWARDS</span>
      </div>
    </div>
  );
};

export default HomePage;
