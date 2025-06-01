export const MEMBER_MAP = {
  "Front-End": {
    원채영: { college: "Hongik Univ." },
    신수진: { college: "Hongik Univ." },
    최서연: { college: "Hongik Univ." },
    한서정: { college: "Ewha. W. Univ." },
    김철흥: { college: "Hongik Univ." },
    송아영: { college: "Hongik Univ." },
    김영서: { college: "Ewha. W. Univ." },
    이주희: { college: "Hongik Univ." },
    권동욱: { college: "Yonsei Univ." },
    김서연: { college: "Ewha. W. Univ." },
  },
  "Back-End": {
    최근호: { college: "Hongik Univ." },
    이석원: { college: "Yonsei Univ." },
    박서연: { college: "Hongik Univ." },
    박채연: { college: "Hongik Univ." },
    김준형: { college: "Hongik Univ." },
    임도현: { college: "Hongik Univ." },
    박정하: { college: "Hongik Univ." },
    서채연: { college: "Hongik Univ." },
    오지현: { college: "Hongik Univ." },
    한혜수: { college: "Hongik Univ." },
  },
} as const;

export type Part = keyof typeof MEMBER_MAP;

export type MemberData = {
  [name: string]: {
    college: string;
  };
};
