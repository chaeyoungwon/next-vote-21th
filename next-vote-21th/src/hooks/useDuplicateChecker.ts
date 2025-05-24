import {
  checkEmailDuplicate,
  checkUsernameDuplicate,
} from "@/apis/checkDuplicate";

import { SignupErrors } from "@/types/signup/dto";

type Status = "error" | "success" | undefined;

export const useDuplicateChecker = (
  setErrors: React.Dispatch<React.SetStateAction<SignupErrors>>,
  setStatuses: React.Dispatch<
    React.SetStateAction<{ id: Status; email: Status }>
  >,
) => {
  const check = async (type: "id" | "email", value: string) => {
    const checkFn =
      type === "id" ? checkUsernameDuplicate : checkEmailDuplicate;
    const { isDuplicate, message } = await checkFn(value);

    setErrors(prev => ({
      ...prev,
      [type]: isDuplicate ? message : "",
    }));

    setStatuses(prev => ({
      ...prev,
      [type]: isDuplicate ? "error" : "success",
    }));
  };

  return { check };
};
