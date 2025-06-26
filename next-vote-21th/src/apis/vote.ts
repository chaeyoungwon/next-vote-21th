import { axiosInstance } from "./axios";

export const fetchElectionInfo = async (sectionCode: string) => {
  const res = await axiosInstance.get("/elections", {
    params: { section: sectionCode },
  });
  return res.data.data?.[0];
};

export const fetchVoteResults = async (electionId: number) => {
  const res = await axiosInstance.get(`/elections/${electionId}/results`);
  return res.data.data?.voteCounts ?? [];
};

export const getMyVote = async (electionId: number) => {
  const res = await axiosInstance.get(`/elections/${electionId}/my-vote`);
  return res.data.data;
};
