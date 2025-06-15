import { useAuthStore } from "@/stores/useAuthStore";
import { AxiosError } from "axios";

import type { LoginPayload } from "@/types/auth/dto";
import { SignupPayload } from "@/types/auth/dto";

import { axiosInstance } from "./axios";

export const login = async (
  payload: LoginPayload,
): Promise<{ token: string | null; errorMessage?: string }> => {
  try {
    const res = await axiosInstance.post("/auth/signin", payload);

    const accessToken = res.headers["authorization"]?.split(" ")[1];
    if (!accessToken) {
      return {
        token: null,
        errorMessage: "로그인에 실패했습니다. 다시 시도해주세요.",
      };
    }

    return { token: accessToken };
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const msg = error.response?.data?.message;
    if (msg) {
      return { token: null, errorMessage: msg };
    }

    if (error.response?.status === 401) {
      return {
        token: null,
        errorMessage: "아이디 또는 비밀번호가 일치하지 않습니다.",
      };
    }

    console.error(error);
    return {
      token: null,
      errorMessage: "로그인 중 오류가 발생했습니다.",
    };
  }
};

export const signup = async (payload: SignupPayload) => {
  try {
    const res = await axiosInstance.post("/auth/signup", payload);
    return res.data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    return null;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
    useAuthStore.getState().clearAuth();
  } catch (error) {
    console.error("로그아웃 실패", error);
  }
};
