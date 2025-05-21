type Field = "id" | "email" | "password" | "confirmPassword";

type SignupForm = Record<Field, string>;
type SignupErrors = Record<Field, string>;

export const validateSignupForm = (form: SignupForm): SignupErrors => {
  let passwordError = "";
  const password = form.password;

  if (password.length < 8 || password.length > 20) {
    passwordError = "8~20자 사이로 입력해주세요.";
  } else if (!/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])/.test(password)) {
    passwordError = "문자, 숫자, 특수문자를 모두 포함해주세요.";
  }

  return {
    id:
      form.id.length < 6 || form.id.length > 20 ? "아이디는 6~20자입니다." : "",
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? "이메일 형식이 올바르지 않습니다."
      : "",
    password: passwordError,
    confirmPassword:
      form.password !== form.confirmPassword
        ? "비밀번호가 일치하지 않습니다."
        : "",
  };
};
