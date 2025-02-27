export interface IUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "ADMIN" | "USER";
  createdAt: Date;
}

export interface ISignUpValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignUpFormProps {
  onSubmit: (values: ISignUpValues) => Promise<void>;
}

export interface IAuthError extends Error {
  message:
    | "EXISTING_GOOGLE_USER"
    | "EXISTING_GITHUB_USER"
    | "EXISTING_EMAIL_USER"
    | string;
}
