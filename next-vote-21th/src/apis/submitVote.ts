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
  // console.log("토큰:", accessToken);
  // console.log("후보 ID:", selectedCandidateId);
  if (accessToken === null) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    // 1. 해당 섹션의 electionId 조회
    const electionRes = await axiosInstance.get(
      `/api/v1/elections?section=${section}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const electionId = electionRes.data[0]?.id;
    if (!electionId) {
      throw new Error("선거 정보를 불러올 수 없습니다.");
    }

    // 2. 투표 요청
    const voteRes = await axiosInstance.post(
      `/api/v1/elections/${electionId}/votes`,
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

    console.log("투표 성공:", voteRes.data);
    alert("투표가 완료되었습니다!");
  } catch (err) {
    console.error("투표 실패:", err);
    alert("투표 요청에 실패했습니다.");
  }
};
