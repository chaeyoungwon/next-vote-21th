"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { signup } from "@/apis/auth";

import { useDuplicateChecker } from "@/hooks/useDuplicateChecker";
import { useSignupForm } from "@/hooks/useSignUpForm";
import { useTeamSelection } from "@/hooks/useTeamSelection";

import PartSelector from "@/components/signup/PartSelector";
import SignupFormFields from "@/components/signup/SignUpFormFields";
import TeamSelector from "@/components/signup/TeamSelector";

const SignUpPage = () => {
  const { form, setForm, errors, setErrors, isDisabled, validate } =
    useSignupForm();

  const [statuses, setStatuses] = useState({
    id: undefined as "error" | "success" | undefined,
    email: undefined as "error" | "success" | undefined,
  });
  const router = useRouter();

  const {
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
  } = useTeamSelection();

  const handleInputChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
    };

  useEffect(() => {
    const hasSelects = !positionKey || !selectedTeam || !selectedMember;
    setErrors(prev => ({ ...prev, disabled: hasSelects ? "true" : "" }));
  }, [positionKey, selectedTeam, selectedMember]);

  const handleSubmit = async () => {
    const isValid = validate();
    if (!isValid || !positionKey || !selectedTeam || !selectedMember) return;

    const payload = {
      name: selectedMember,
      username: form.id,
      password: form.password,
      email: form.email,
      position: positionKey,
      team: selectedTeam.code,
    };

    const result = await signup(payload);
    if (result) {
      router.push("/login");
    }
  };

  const { check } = useDuplicateChecker(setErrors, setStatuses);

  const isSubmitDisabled =
    isDisabled ||
    !positionKey ||
    !selectedTeam ||
    !selectedMember ||
    statuses.id !== "success" ||
    statuses.email !== "success";

  return (
    <div className="scrollbar-hide flex min-h-screen w-screen flex-col items-center overflow-y-auto pt-[124px] pb-9 md:pt-[121px]">
      <div className="flex w-[313px] flex-col">
        <div className="flex flex-col gap-9">
          <h1 className="text-heading3 text-green-dark md:text-heading1">
            SIGN UP
          </h1>

          <PartSelector
            selectedPart={selectedLabel}
            onSelect={label => {
              setSelectedLabel(label);
              setSelectedTeamName("");
              setSelectedMember("");
            }}
          />

          <TeamSelector
            teams={teams}
            members={members}
            selectedTeam={selectedTeamName}
            selectedMember={selectedMember}
            onTeamSelect={name => {
              setSelectedTeamName(name);
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
          <SignupFormFields
            form={form}
            errors={errors}
            statuses={statuses}
            setStatuses={setStatuses}
            setForm={setForm}
            setErrors={setErrors}
            handleInputChange={handleInputChange}
            check={check}
          />

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`text-heading3 md:text-heading2 w-[313px] rounded-[20px] py-3 text-white ${
              isSubmitDisabled ? "cursor-not-allowed bg-gray-300" : "bg-green"
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
