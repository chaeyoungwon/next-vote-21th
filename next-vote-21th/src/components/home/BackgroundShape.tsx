import GreenShape from "@/public/svgs/home/greenShape.svg";
import MainShape from "@/public/svgs/home/mainShape.svg";
import VioletShape from "@/public/svgs/home/violetShape.svg";

const BackgroundShapes = () => {
  return (
    <>
      <GreenShape className="animate-fade-in-left absolute top-[86px] left-[-10%] z-[-1] opacity-0 transition-all duration-700 ease-out md:top-[119px] md:left-[150px] md:scale-150" />
      <VioletShape className="animate-fade-in-right absolute top-[306px] right-[-10%] z-[-1] opacity-0 transition-all duration-700 ease-out md:right-[110px] md:scale-150" />
      <MainShape className="animate-fade-in-up absolute bottom-0 left-0 z-[-1] opacity-0 transition-all delay-[300ms] duration-700 ease-out max-md:hidden" />
    </>
  );
};

export default BackgroundShapes;
