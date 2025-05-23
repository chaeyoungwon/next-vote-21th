import {
  checkEmailDuplicate,
  checkUsernameDuplicate,
} from "@/apis/checkDuplicate";

export const useDuplicateChecker = () => {
  const check = async (
    type: "id" | "email",
    value: string,
    setErrors: (prev: any) => void,
    setStatuses: (prev: any) => void,
  ) => {
    const checkFn =
      type === "id" ? checkUsernameDuplicate : checkEmailDuplicate;

    const { isDuplicate, message } = await checkFn(value);

    setErrors((prev: any) => ({
      ...prev,
      [type]: isDuplicate ? message : "",
    }));

    setStatuses((prev: any) => ({
      ...prev,
      [type]: isDuplicate ? "error" : "success",
    }));
  };

  return { check };
};
