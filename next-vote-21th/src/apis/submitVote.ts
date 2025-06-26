import { useAuthStore } from "@/stores/useAuthStore";

import { axiosInstance } from "@/apis/axios";

export const submitVote = async ({
  section,
  selectedCandidateId,
}: {
  section: "DEMO_DAY" | "FRONT_KING" | "BACK_KING";
  selectedCandidateId: number;
}) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken === null) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    // 1. 해당 섹션의 electionId 조회
    const electionRes = await axiosInstance.get(
      `/elections?section=${section}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("electionRes:", electionRes.data);
    const electionId = electionRes.data.data[0]?.id;
    if (!electionId) {
      throw new Error("선거 정보를 불러올 수 없습니다.");
    }
    console.log("POST body:", {
      electionId: electionId,
      candidateId: selectedCandidateId,
    });
    // 2. 투표 요청
    const voteRes = await axiosInstance.post(
      `/elections/${electionId}/votes`,
      {
        electionId,
        candidateId: selectedCandidateId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  } catch (err: any) {
    console.error("투표 실패:", err);
    throw err;
  }
};
