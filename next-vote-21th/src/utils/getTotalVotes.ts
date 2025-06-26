import { fetchVoteResults } from "@/apis/vote";

import { ELECTION_ID } from "@/constants/electionData";

export const getTotalVotes = async (): Promise<number> => {
  const voteCountsArray = await Promise.all(
    Object.values(ELECTION_ID).map(async electionId => {
      const voteCounts = await fetchVoteResults(electionId);
      return voteCounts.reduce(
        (sum: number, item: { voteCount: number }) => sum + item.voteCount,
        0,
      );
    }),
  );

  return voteCountsArray.reduce((sum, count) => sum + count, 0);
};
