export type Part = keyof typeof MEMBER_MAP;

export type Member = {
  college: string;
  id: number;
};

export type MemberMap = {
  "Front-End": Record<string, Member>;
  "Back-End": Record<string, Member>;
};

export const MEMBER_MAP: MemberMap = {
  "Front-End": {
    원채영: { college: "Hongik Univ.", id: 17 },
    신수진: { college: "Hongik Univ.", id: 16 },
    최서연: { college: "Hongik Univ.", id: 18 },
    한서정: { college: "Ewha. W. Univ.", id: 19 },
    김철흥: { college: "Hongik Univ.", id: 22 },
    송아영: { college: "Hongik Univ.", id: 23 },
    김영서: { college: "Ewha. W. Univ.", id: 20 },
    이주희: { college: "Hongik Univ.", id: 21 },
    권동욱: { college: "Yonsei Univ.", id: 24 },
    김서연: { college: "Ewha. W. Univ.", id: 25 },
  },
  "Back-End": {
    최근호: { college: "Hongik Univ.", id: 7 },
    이석원: { college: "Yonsei Univ.", id: 6 },
    박서연: { college: "Hongik Univ.", id: 8 },
    박채연: { college: "Hongik Univ.", id: 9 },
    김준형: { college: "Hongik Univ.", id: 12 },
    임도현: { college: "Hongik Univ.", id: 13 },
    박정하: { college: "Hongik Univ.", id: 14 },
    서채연: { college: "Hongik Univ.", id: 15 },
    오지현: { college: "Hongik Univ.", id: 10 },
    한혜수: { college: "Hongik Univ.", id: 11 },
  },
};
