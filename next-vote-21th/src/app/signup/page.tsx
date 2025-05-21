"use client";

import { useEffect, useState } from "react";

import InputField from "@/components/login/InputField";

const teamList = {
  "Front-End": {
    하니홈: ["원채영", "신수진"],
    팝업사이클: ["홍길동", "김코드"],
  },
  "Back-End": {
    인플루이: ["백지훈", "남백엔드"],
    이어드림: ["이승수", "박서버"],
  },
} as const;

type Part = keyof typeof teamList;
type Team = keyof (typeof teamList)[Part];

const SignUpPage = () => {
  const [selectedPart, setSelectedPart] = useState<Part | null>("Front-End");
  const [selectedTeam, setSelectedTeam] = useState<Team | "">("");
  const [selectedMember, setSelectedMember] = useState("");

  const teams = selectedPart ? Object.keys(teamList[selectedPart]) : [];
  const members =
    selectedPart && selectedTeam
      ? teamList[selectedPart][selectedTeam as Team] || []
      : [];

  const [form, setForm] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    let passwordError = "";
    const password = form.password;

    if (password.length < 8 || password.length > 20) {
      passwordError = "8~20자 사이로 입력해주세요.";
    } else if (!/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])/.test(password)) {
      passwordError = "문자, 숫자, 특수문자를 모두 포함해주세요.";
    }
    const newErrors = {
      id:
        form.id.length < 6 || form.id.length > 20
          ? "아이디는 6~20자입니다."
          : "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? "이메일 형식이 올바르지 않습니다."
        : "",
      password: passwordError,
      confirmPassword:
        form.password !== form.confirmPassword
          ? "비밀번호가 일치하지 않습니다."
          : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(err => err === "");
  };

  const handleSubmit = () => {
    if (!validate()) return;
    alert("회원가입 완료!");
    // TODO: API 호출
  };

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const hasError = Object.values(errors).some(e => e);
    const hasEmpty =
      !form.id || !form.email || !form.password || !form.confirmPassword;
    const hasSelects = !selectedPart || !selectedTeam || !selectedMember;

    setIsDisabled(hasError || hasEmpty || hasSelects);
  }, [form, errors, selectedPart, selectedTeam, selectedMember]);
  return (
    <div className="flex min-h-screen w-screen flex-col items-center pt-[124px] md:pt-[121px]">
      <div className="flex w-[313px] flex-col">
        <div className="flex flex-col gap-[37px] md:gap-[44px]">
          <h1 className="text-heading3 text-green-dark md:!text-[1.375rem]">
            SIGN UP
          </h1>

          {/* 파트 선택 */}
          <div className="mx-auto w-full min-w-[313px]">
            <p className="text-body1-sb mb-[15px] md:!text-[18px]">파트 *</p>
            <div className="border-green flex w-full overflow-hidden rounded-full border">
              {(["Front-End", "Back-End"] as Part[]).map(part => (
                <button
                  key={part}
                  onClick={() => {
                    setSelectedPart(part);
                    setSelectedTeam("");
                    setSelectedMember("");
                  }}
                  className={`text-heading3 w-1/2 px-6 py-2 transition-colors duration-200 ${
                    selectedPart === part
                      ? "bg-green text-white"
                      : "text-green hover:bg-green-light"
                  } ${part === "Front-End" ? "rounded-l-full" : "rounded-r-full"}`}
                >
                  {part}
                </button>
              ))}
            </div>
          </div>

          {/* 팀/이름 선택 */}
          <div className="mb-15 flex gap-3">
            <div className="mb-2">
              <p className="text-body1-sb mb-2 md:!text-[18px]">팀명 *</p>
              <select
                value={selectedTeam}
                onChange={e => {
                  setSelectedTeam(e.target.value as Team);
                  setSelectedMember("");
                }}
                disabled={!selectedPart}
                className="border-green text-green w-[150px] rounded-[20px] border px-4 py-2"
              >
                <option value="">팀 선택</option>
                {teams.map(team => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <p className="text-body1-sb mb-2 md:!text-[18px]">이름 *</p>
              <select
                value={selectedMember}
                onChange={e => setSelectedMember(e.target.value)}
                disabled={!selectedTeam}
                className="border-green text-green w-[150px] rounded-[20px] border px-4 py-2"
              >
                <option value="">이름 선택</option>
                {members.map(member => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 입력 필드 */}
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
            onChange={e => {
              setForm({ ...form, email: e.target.value });
              if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
            }}
            error={errors.email}
          />
          <InputField
            label="비밀번호 *"
            type="password"
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
            label="비밀번호 재입력 *"
            type="password"
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
      </div>

      <button
        onClick={handleSubmit}
        disabled={isDisabled}
        className={`w-[313px] rounded-full py-3 text-sm font-semibold text-white ${
          isDisabled ? "cursor-not-allowed bg-gray-300" : "bg-green"
        }`}
      >
        가입하기
      </button>
    </div>
  );
};

export default SignUpPage;
