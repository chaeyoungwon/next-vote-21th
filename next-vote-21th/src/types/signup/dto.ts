export type SignupForm = {
  id: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignupErrors = Record<keyof SignupForm, string>;
