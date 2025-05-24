import { useMemo, useState } from "react";

import { teamList } from "@/constants/teamLists";

export const useTeamSelection = () => {
  const [selectedLabel, setSelectedLabel] = useState("Front-End");
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  const positionKey = useMemo<"FRONTEND" | "BACKEND">(
    () => (selectedLabel === "Front-End" ? "FRONTEND" : "BACKEND"),
    [selectedLabel],
  );

  const selectedTeam = useMemo(
    () => teamList.find(team => team.name === selectedTeamName),
    [selectedTeamName],
  );

  const teams = useMemo(() => teamList.map(team => team.name), []);
  const members = useMemo(
    () => selectedTeam?.members?.[positionKey] ?? [],
    [selectedTeam, positionKey],
  );

  return {
    selectedLabel,
    selectedTeamName,
    selectedMember,
    setSelectedLabel,
    setSelectedTeamName,
    setSelectedMember,
    positionKey,
    selectedTeam,
    teams,
    members,
  };
};
