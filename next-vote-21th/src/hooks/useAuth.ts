"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login, logout, signup } from "@/apis/auth";

import { LoginPayload, SignupPayload } from "@/types/auth/dto";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { clearAuth } = useAuthStore();

  // 1. 회원가입
  const signupMutation = useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
    onSuccess: () => router.push("/login"),
    onError: () => console.error("회원가입 실패"),
  });

  // 2. 로그인
  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: ({ token, errorMessage }) => {
      if (token) {
        router.push("/");
      } else {
        console.error(errorMessage);
      }
    },
  });

  // 3. 로그아웃
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      router.push("/");
    },
    onError: () => console.error("로그아웃 실패"),
  });

  return {
    // 인증
    signup: signupMutation.mutate,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,

    // 상태
    isLoginLoading: loginMutation.isPending,
    isSignupLoading: signupMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
  };
};
