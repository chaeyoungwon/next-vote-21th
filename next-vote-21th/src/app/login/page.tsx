"use client";

import Link from "next/link";

import { useState } from "react";

import InputField from "@/components/login/InputField";

const LoginPage = () => {
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");

  const handleLogin = () => {
    const isIdValid = false;
    const isPwValid = false;

    setIdError(isIdValid ? "" : "존재하지 않는 아이디입니다.");
    setPwError(isPwValid ? "" : "비밀번호가 일치하지 않습니다.");
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center pt-[124px] md:pt-[272px]">
      <div className="flex w-[313px] flex-col gap-[46px] md:gap-[44px]">
        <h1 className="text-heading3 text-green-dark md:!text-[1.375rem]">
          LOGIN
        </h1>

        <div className="flex w-full flex-col">
          <div className="flex flex-col gap-[13px] md:gap-[18px]">
            <InputField
              label="아이디"
              placeholder="아이디를 입력해주세요."
              error={idError}
            />
            <InputField
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              error={pwError}
            />
          </div>

          <button
            className="bg-green text-heading3 mt-[30px] h-fit w-full cursor-pointer rounded-[20px] py-[10px] text-white focus:outline-none md:mt-[44px] md:!text-[1.25rem]"
            onClick={handleLogin}
          >
            로그인하기
          </button>

          <span className="text-cap1-med mt-[22px] text-center text-gray-800 underline md:!text-[14px]">
            <Link href="/signup">계정이 없다면 회원가입하러 가기 &gt;</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
