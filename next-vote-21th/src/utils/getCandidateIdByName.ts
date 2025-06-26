import { MEMBER_MAP } from "@/constants/memberData";

export const getCandidateIdByName = (name: string): number | null => {
  for (const part in MEMBER_MAP) {
    const memberData = MEMBER_MAP[part as keyof typeof MEMBER_MAP];
    if (name in memberData) {
      return memberData[name].id;
    }
  }
  return null;
};
