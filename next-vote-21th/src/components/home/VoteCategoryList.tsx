const categories = [
  "# 프론트엔드 파트장 투표",
  "# 백엔드 파트장 투표",
  "# 데모데이 투표",
];

const VoteCategoryList = () => {
  return (
    <div className="mt-[132px] flex flex-col gap-2 md:mt-[70px] md:gap-3 md:self-center">
      <div className="text-body1-sb border-green bg-green-light text-green h-9 w-fit rounded-3xl border px-[10px] py-[7px] md:h-[54px] md:px-[23px] md:py-[11px] md:!text-2xl">
        투표 분야
      </div>
      {categories.map((label, idx) => (
        <span key={idx} className="text-body1-sb text-black md:!text-2xl">
          {label}
        </span>
      ))}
    </div>
  );
};

export default VoteCategoryList;
