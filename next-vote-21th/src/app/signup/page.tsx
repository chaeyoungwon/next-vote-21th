"use client";

import { useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { signup } from "@/apis/auth";
import {
  checkEmailDuplicate,
  checkUsernameDuplicate,
} from "@/apis/checkDuplicate";

import { useSignupForm } from "@/hooks/useSignUpForm";

import InputField from "@/components/common/InputField";
import PartSelector from "@/components/signup/PartSelector";
import TeamSelector from "@/components/signup/TeamSelector";

import { teamList } from "@/constants/signup/teamLists";

const SignUpPage = () => {
  const { form, setForm, errors, setErrors, isDisabled, validate } =
    useSignupForm();

  const [statuses, setStatuses] = useState({
    id: undefined as "error" | "success" | undefined,
    email: undefined as "error" | "success" | undefined,
  });
  const router = useRouter();

  const [selectedLabel, setSelectedLabel] = useState("Front-End");
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  const positionKey = useMemo<"FRONTEND" | "BACKEND">(
    () => (selectedLabel === "Front-End" ? "FRONTEND" : "BACKEND"),
    [selectedLabel],
  );

  const teams = useMemo(() => teamList.map(team => team.name), []);

  const selectedTeam = useMemo(
    () => teamList.find(team => team.name === selectedTeamName),
    [selectedTeamName],
  );

  const members = useMemo(
    () => selectedTeam?.members?.[positionKey] ?? [],
    [selectedTeam, positionKey],
  );

  const handleInputChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
    };

  const handleCheckDuplicate = async (
    type: "id" | "email",
    checkFn: (
      value: string,
    ) => Promise<{ isDuplicate: boolean; message: string }>,
  ) => {
    const value = form[type];
    const { isDuplicate, message } = await checkFn(value);
    setErrors(prev => ({ ...prev, [type]: isDuplicate ? message : "" }));
    setStatuses(prev => ({
      ...prev,
      [type]: isDuplicate ? "error" : "success",
    }));
    if (!isDuplicate && type === "email") alert(message);
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

    try {
      await signup(payload);
      router.push("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const isSubmitDisabled =
    isDisabled || !positionKey || !selectedTeam || !selectedMember;

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
          <div className="mb-6 flex flex-col gap-[10px]">
            <InputField
              label="아이디 *"
              placeholder="6~20자 이내로 입력해주세요."
              value={form.id}
              onChange={handleInputChange("id")}
              onCheckDuplicate={() =>
                handleCheckDuplicate("id", checkUsernameDuplicate)
              }
              showCheckButton
              error={errors.id}
              status={statuses.id}
            />

            <InputField
              label="이메일 *"
              placeholder="이메일을 입력해주세요."
              value={form.email}
              autoComplete="email"
              onChange={handleInputChange("email")}
              onCheckDuplicate={() =>
                handleCheckDuplicate("email", checkEmailDuplicate)
              }
              showCheckButton
              error={errors.email}
              status={statuses.email}
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
