import { useAuthStore } from "@/stores/useAuthStore";

import { axiosInstance } from "./axios";

interface SubmitVoteParams {
  section: "DEMO_DAY" | "FRONT_KING" | "BACK_KING";
  selectedCandidateId: number;
}

// 선거 정보 조회
export const fetchElectionInfo = async (sectionCode: string) => {
  const res = await axiosInstance.get("/elections", {
    params: { section: sectionCode },
  });
  return res.data.data?.[0];
};

// 선거 결과 (투표 수) 조회
export const fetchVoteResults = async (electionId: number) => {
  const res = await axiosInstance.get(`/elections/${electionId}/results`);
  return res.data.data?.voteCounts ?? [];
};

// 내가 투표한 후보 조회
export const getMyVote = async (electionId: number) => {
  const res = await axiosInstance.get(`/elections/${electionId}/my-vote`);
  return res.data.data;
};

// 득표순으로 정렬된 후보 목록 조회
export const fetchSortedCandidates = async (electionId: number) => {
  const res = await axiosInstance.get(
    `/elections/${electionId}/candidates/sorts/vote-count`,
  );
  return res.data.data;
};

// 투표하기
export const submitVote = async ({
  section,
  selectedCandidateId,
}: SubmitVoteParams) => {
  const { accessToken } = useAuthStore.getState();

  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return;
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const { data: electionData } = await axiosInstance.get("/elections", {
      params: { section },
      headers,
    });

    const electionId = electionData.data?.[0]?.id;
    if (!electionId) {
      throw new Error("선거 ID를 찾을 수 없습니다.");
    }

    await axiosInstance.post(
      `/elections/${electionId}/votes`,
      {
        electionId,
        candidateId: selectedCandidateId,
      },
      { headers },
    );
  } catch (error) {
    console.error("❌ 투표 실패:", error);
    throw error;
  }
};
