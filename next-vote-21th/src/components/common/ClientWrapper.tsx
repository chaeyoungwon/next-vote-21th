"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { refreshToken } from "@/apis/auth";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const setAuthChecked = useAuthStore(state => state.setAuthChecked);

  useEffect(() => {
    const checkAuth = async () => {
      await refreshToken();
      setAuthChecked();
    };
    checkAuth();
  }, []);

  return <>{children}</>;
};

export default ClientWrapper;
