export type OnboardingInitials = {
  progress: number;
  stage: number;
  sidebar: string;
  loading: boolean;
  errorMessage: string;
  errorStatus: ErrorStatusEnum;
};
export type ErrorStatusEnum =
  | "error"
  | "info"
  | "warning"
  | "success"
  | "loading";

export type RegisterUserDto = {
  name: string;
  officeEmail: string;
  officePhoneNumber: string;
  usageLocation: string;
  prefferedLanguageId?: number;
  createdBy: string;
  password: string;
  roleIds?: number[];
};
export type ResetTokenDto = {
  email: string;
};
export type VerifyTokenDto = {
  email: string;
  token: string;
};
