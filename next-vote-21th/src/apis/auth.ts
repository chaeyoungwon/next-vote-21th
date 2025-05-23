import { axiosInstance } from "./axios";

type SignupPayload = {
  name: string;
  username: string;
  password: string;
  email: string;
  position: "FRONTEND" | "BACKEND" | "DESIGN" | "PRODUCT_MANAGER";
  team: "HANI_HOME" | "POP_UPCYCLE" | "DEAR_DREAM" | "PROMESA" | "INFLUY";
};

export const login = async (id: string, password: string) => {
  const res = await axiosInstance.post(
    "/api/v1/auth/login",
    {
      username: id,
      password,
    },
    {
      withCredentials: true,
    },
  );

  const accessToken = res.headers["authorization"]?.split(" ")[1];
  if (!accessToken) {
    throw new Error("토큰이 존재하지 않습니다.");
  }

  return accessToken;
};

export const signup = async (payload: SignupPayload) => {
  const res = await axiosInstance.post("/api/v1/auth/signup", payload);
  return res.data;
};

export const logout = async () => {
  await axiosInstance.post("/api/v1/auth/logout");
};
