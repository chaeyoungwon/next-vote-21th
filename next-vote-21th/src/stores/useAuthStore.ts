import { create } from "zustand";

interface AuthStore {
  accessToken: string;
  isLoggedIn: boolean;
  isAuthChecked: boolean;

  setAccessToken: (token: string) => void;
  clearAuth: () => void;
  setAuthChecked: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  accessToken: "",
  isLoggedIn: false,
  isAuthChecked: false,

  setAccessToken: token =>
    set({
      accessToken: token,
      isLoggedIn: true,
    }),

  clearAuth: () =>
    set({
      accessToken: "",
      isLoggedIn: false,
      isAuthChecked: true, // 로그아웃 시도 후에도 체크 완료 처리
    }),

  setAuthChecked: () => set({ isAuthChecked: true }),
}));
