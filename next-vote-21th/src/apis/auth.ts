import { useAuthStore } from "@/stores/useAuthStore";

import type { LoginPayload, SignupPayload } from "@/types/auth/dto";

import { axiosInstance } from "./axios";

export const login = async (
  payload: LoginPayload,
): Promise<{ token: string | null; errorMessage: string }> => {
  try {
    const res = await axiosInstance.post("/auth/signin", payload);
    const accessToken = res.headers["authorization"]?.split(" ")[1];
    if (!accessToken) {
      return { token: null, errorMessage: "로그인에 실패하였습니다." };
    }
    return { token: accessToken, errorMessage: "" };
  } catch {
    return {
      token: null,
      errorMessage: "아이디 또는 비밀번호가 일치하지 않습니다.",
    };
  }
};

export const signup = async (payload: SignupPayload) => {
  try {
    const res = await axiosInstance.post("/auth/signup", payload);
    return res.data;
  } catch {
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    return null;
  }
};

export const logout = async () => {
  await axiosInstance.post("/auth/logout");
  useAuthStore.getState().clearAuth();
};

export const refreshToken = async () => {
  try {
    const res = await axiosInstance.post("/auth/tokens/refresh");

    const authHeader = res.headers["authorization"];
    if (authHeader?.startsWith("Bearer ")) {
      const newToken = authHeader.split(" ")[1];
      useAuthStore.getState().setAccessToken(newToken);
    }
  } catch (err) {
    console.error("accessToken 재발급 실패", err);
  }
};
