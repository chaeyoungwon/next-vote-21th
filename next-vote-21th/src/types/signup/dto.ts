import { signupSchema } from "@/schemas/signupSchema";
import { z } from "zod";

export type SignupForm = z.infer<typeof signupSchema>;
export type SignupErrors = Record<keyof SignupForm, string>;
