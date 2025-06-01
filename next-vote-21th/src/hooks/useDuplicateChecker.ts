import {
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";

import {
  checkEmailDuplicate,
  checkUsernameDuplicate,
} from "@/apis/checkDuplicate";

// 상태 타입: 성공 / 실패 / undefined
type Status = "error" | "success" | undefined;

// 훅에 전달되는 props 타입 정의
interface UseDuplicateCheckerProps<T extends FieldValues> {
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  setStatuses: React.Dispatch<
    React.SetStateAction<{ id: Status; email: Status }>
  >;
}

// 실제 훅 구현
export const useDuplicateChecker = <T extends FieldValues>({
  setError,
  clearErrors,
  setStatuses,
}: UseDuplicateCheckerProps<T>) => {
  // type은 "id" | "email"이어야 하고, Path<T> 타입으로 제한
  const check = async (type: Path<T> & ("id" | "email"), value: string) => {
    const checkFn =
      type === "id" ? checkUsernameDuplicate : checkEmailDuplicate;

    try {
      const { isDuplicate, message } = await checkFn(value);

      if (isDuplicate) {
        setError(type, { message });
        setStatuses(prev => ({ ...prev, [type]: "error" }));
      } else {
        clearErrors(type);
        setStatuses(prev => ({ ...prev, [type]: "success" }));
      }
    } catch (err) {
      setError(type, {
        message: "중복 확인 중 오류가 발생했습니다.",
      });
      setStatuses(prev => ({ ...prev, [type]: "error" }));
    }
  };

  return { check };
};
