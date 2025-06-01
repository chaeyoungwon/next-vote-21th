"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { login } from "@/apis/auth";

import InputField from "@/components/common/InputField";

const LoginPage = () => {
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  type FormKey = keyof typeof form; // 'id' | 'password'

  const handleInputFieldChange = (key: FormKey, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const [loginError, setLoginError] = useState("");

  const router = useRouter();
  const setAccessToken = useAuthStore(state => state.setAccessToken);

  const handleLogin = async () => {
    setLoginError("");
    const { token, errorMessage } = await login(form.id, form.password);

    if (token) {
      setAccessToken(token);
      router.push("/");
    } else if (errorMessage) {
      setLoginError(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center pt-[124px] md:pt-[272px]">
      <div className="flex w-[313px] flex-col gap-[46px] md:gap-[44px]">
        <h1 className="text-heading3 text-green-dark md:text-heading1">
          LOGIN
        </h1>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex w-full flex-col"
        >
          <div className="flex flex-col gap-[13px] md:gap-[18px]">
            <InputField
              label="아이디"
              placeholder="아이디를 입력해주세요."
              value={form.id}
              onChange={e => handleInputFieldChange("id", e.target.value)}
              autoComplete="username"
            />

            <InputField
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={form.password}
              onChange={e => handleInputFieldChange("password", e.target.value)}
              autoComplete="current-password"
              error={loginError}
            />
          </div>

          <button
            type="submit"
            className="bg-green hover:bg-green-dark text-heading3 md:heading2 mt-[30px] h-fit w-full cursor-pointer rounded-[20px] py-[10px] text-white focus:outline-none md:mt-[44px]"
          >
            로그인하기
          </button>
        </form>

        <span className="text-cap1-med md:text-body2-med mt-[22px] text-center text-gray-800 underline">
          <Link href="/signup">계정이 없다면 회원가입하러 가기 &gt;</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
