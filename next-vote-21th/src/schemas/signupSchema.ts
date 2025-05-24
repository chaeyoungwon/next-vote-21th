import { z } from "zod";

export const signupSchema = z
  .object({
    id: z.string().refine(val => val.length >= 6 && val.length <= 20, {
      message: "아이디는 6~20자 사이여야 합니다.",
    }),
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    password: z
      .string()
      .refine(val => val.length >= 8 && val.length <= 20, {
        message: "8~20자 사이로 입력해주세요.",
      })
      .refine(val => /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])/.test(val), {
        message: "문자, 숫자, 특수문자를 모두 포함해주세요.",
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
