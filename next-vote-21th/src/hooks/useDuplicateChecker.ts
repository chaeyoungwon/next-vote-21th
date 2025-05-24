import {
  checkEmailDuplicate,
  checkUsernameDuplicate,
} from "@/apis/checkDuplicate";

type DuplicateType = "id" | "email";
type Status = "error" | "success" | undefined;
type ErrorOrStatusMap = Record<DuplicateType, string | Status | undefined>;

export const useDuplicateChecker = () => {
  const check = async (
    type: DuplicateType,
    value: string,
    setErrors: (fn: (prev: ErrorOrStatusMap) => ErrorOrStatusMap) => void,
    setStatuses: (fn: (prev: ErrorOrStatusMap) => ErrorOrStatusMap) => void,
  ) => {
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
