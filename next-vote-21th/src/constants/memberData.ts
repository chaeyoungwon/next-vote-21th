export const MEMBER_MAP = {
  "Front-End": {
    원채영: { college: "Hongik Univ.", id: 1 },
    신수진: { college: "Hongik Univ.", id: 2 },
    최서연: { college: "Hongik Univ.", id: 3 },
    한서정: { college: "Ewha. W. Univ.", id: 4 },
    김철흥: { college: "Hongik Univ.", id: 5 },
    송아영: { college: "Hongik Univ.", id: 6 },
    김영서: { college: "Ewha. W. Univ.", id: 7 },
    이주희: { college: "Hongik Univ.", id: 8 },
    권동욱: { college: "Yonsei Univ.", id: 9 },
    김서연: { college: "Ewha. W. Univ.", id: 10 },
  },
  "Back-End": {
    최근호: { college: "Hongik Univ.", id: 11 },
    이석원: { college: "Yonsei Univ.", id: 12 },
    박서연: { college: "Hongik Univ.", id: 13 },
    박채연: { college: "Hongik Univ.", id: 14 },
    김준형: { college: "Hongik Univ.", id: 15 },
    임도현: { college: "Hongik Univ.", id: 16},
    박정하: { college: "Hongik Univ.", id: 17 },
    서채연: { college: "Hongik Univ.", id: 18 },
    오지현: { college: "Hongik Univ.", id: 19 },
    한혜수: { college: "Hongik Univ.", id: 20 },
  },
} as const;

export type Part = keyof typeof MEMBER_MAP;

export type MemberData = {
  [name: string]: {
    college: string;
    id: number;
  };
};
