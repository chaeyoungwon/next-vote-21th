import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

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
    localStorage.removeItem("skipAutoLogin");

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
  localStorage.setItem("skipAutoLogin", "true");
};

export const refreshToken = async (): Promise<boolean> => {
  const { setAccessToken, clearAuth } = useAuthStore.getState();
  try {
    const res = await axiosInstance.post("/auth/tokens/refresh");
    const token = res.headers["authorization"]?.replace("Bearer ", "");

    if (!token) throw new Error("Authorization 헤더에 토큰 없음");

    setAccessToken(token);
    localStorage.removeItem("skipAutoLogin");
    return true;
  } catch (err) {
    if (
      axios.isAxiosError(err) &&
      [400, 401].includes(err.response?.status ?? 0)
    ) {
      console.info("refreshToken 쿠키가 없거나 만료됨");
    } else {
      console.error("refreshToken 예외 발생:", err);
    }

    clearAuth();
    localStorage.setItem("skipAutoLogin", "true");
    return false;
  }
};
