import Dropdown from "./Dropdown";

interface TeamSelectorProps {
  teams: readonly string[];
  members: readonly string[];
  selectedTeam: string;
  selectedMember: string;
  onTeamSelect: (team: string) => void;
  onMemberSelect: (member: string) => void;
}

const TeamSelector = ({
  teams,
  members,
  selectedTeam,
  selectedMember,
  onTeamSelect,
  onMemberSelect,
}: TeamSelectorProps) => {
  return (
    <div className="mb-12 flex flex-col">
      <div className="flex gap-3">
        <div className="mb-2">
          <p className="text-body1-sb md:text-heading4 mb-2">팀명 *</p>
          <Dropdown
            options={teams}
            selected={selectedTeam}
            onSelect={onTeamSelect}
            placeholder="팀 선택"
          />
        </div>

        <div className="mb-2">
          <p className="text-body1-sb md:text-heading4 mb-2">이름 *</p>
          <Dropdown
            options={members}
            selected={selectedMember}
            onSelect={onMemberSelect}
            placeholder={selectedTeam ? "이름 선택" : "- - -"}
            disabled={!selectedTeam}
          />
        </div>
      </div>
      {!selectedTeam && (
        <p className="text-cap1-med text-right text-gray-700">
          팀을 먼저 선택해주세요.
        </p>
      )}
    </div>
  );
};

export default TeamSelector;
