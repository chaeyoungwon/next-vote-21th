"use client";

import { useEffect, useState } from "react";

import { useSignupForm } from "@/hooks/useSignUpForm";

import InputField from "@/components/common/InputField";
import PartSelector from "@/components/signup/PartSelector";
import TeamSelector from "@/components/signup/TeamSelector";

import { teamList } from "@/constants/signup/teamLists";

type Part = keyof typeof teamList;
type Team = keyof (typeof teamList)[Part];

const SignUpPage = () => {
  const { form, setForm, errors, setErrors, isDisabled, validate } =
    useSignupForm();

  const [selectedPart, setSelectedPart] = useState<Part | null>("Front-End");
  const [selectedTeam, setSelectedTeam] = useState<Team | "">("");
  const [selectedMember, setSelectedMember] = useState("");

  const teams = selectedPart ? Object.keys(teamList[selectedPart]) : [];
  const members =
    selectedPart && selectedTeam
      ? teamList[selectedPart][selectedTeam as Team] || []
      : [];

  useEffect(() => {
    const hasSelects = !selectedPart || !selectedTeam || !selectedMember;
    setErrors(prev => ({ ...prev, disabled: hasSelects ? "true" : "" }));
  }, [selectedPart, selectedTeam, selectedMember]);

  const handleSubmit = () => {
    const isValid = validate();
    if (!isValid || !selectedPart || !selectedTeam || !selectedMember) return;
    alert("회원가입 완료!");
    // TODO: API 호출
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center pt-[124px] md:pt-[121px]">
      <div className="flex w-[313px] flex-col">
        <div className="flex flex-col gap-9">
          <h1 className="text-heading3 text-green-dark md:text-heading1">
            SIGN UP
          </h1>

          <PartSelector
            selectedPart={selectedPart}
            onSelect={part => {
              setSelectedPart(part);
              setSelectedTeam("");
              setSelectedMember("");
            }}
          />

          <TeamSelector
            teams={teams}
            members={members}
            selectedTeam={selectedTeam}
            selectedMember={selectedMember}
            onTeamSelect={team => {
              setSelectedTeam(team as Team);
              setSelectedMember("");
            }}
            onMemberSelect={setSelectedMember}
          />
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex w-[313px] flex-col"
        >
          <div className="mb-6 flex flex-col gap-[10px]">
            <InputField
              label="아이디 *"
              placeholder="아이디를 입력해주세요. (6~20자)"
              value={form.id}
              onChange={e => {
                setForm({ ...form, id: e.target.value });
                if (errors.id) setErrors(prev => ({ ...prev, id: "" }));
              }}
              error={errors.id}
            />
            <InputField
              label="이메일 *"
              placeholder="이메일을 입력해주세요."
              value={form.email}
              autoComplete="email"
              onChange={e => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
              }}
              error={errors.email}
            />
            <InputField
              label="비밀번호 *"
              type="password"
              autoComplete="new-password"
              placeholder="문자, 숫자, 특수문자 포함 8~20자"
              value={form.password}
              onChange={e => {
                setForm({ ...form, password: e.target.value });
                if (errors.password)
                  setErrors(prev => ({ ...prev, password: "" }));
              }}
              error={errors.password}
            />
            <InputField
              label="비밀번호 * 재입력 "
              type="password"
              autoComplete="new-password"
              placeholder="비밀번호 재입력"
              value={form.confirmPassword}
              onChange={e => {
                setForm({ ...form, confirmPassword: e.target.value });
                if (errors.confirmPassword)
                  setErrors(prev => ({ ...prev, confirmPassword: "" }));
              }}
              error={errors.confirmPassword}
            />
          </div>

          <button
            type="submit"
            disabled={
              isDisabled || !selectedPart || !selectedTeam || !selectedMember
            }
            className={`text-heading3 md:text-heading2 w-[313px] rounded-[20px] py-3 text-white ${
              isDisabled || !selectedPart || !selectedTeam || !selectedMember
                ? "cursor-not-allowed bg-gray-300"
                : "bg-green"
            }`}
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
