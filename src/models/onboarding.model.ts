export type OnboardingInitials = {
  progress: number;
  stage: number;
  sidebar: string;
  loading: boolean;
  errorMessage: string;
  errorStatus: ErrorStatusEnum;
  user: IUser | null;
  apiCategory: string;
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
};
export type SignInDto = {
  email: string;
  password: string;
};
export type ResetTokenDto = {
  email: string;
};
export type VerifyTokenDto = {
  email: string;
  token: string;
};
export type LogActivityDto = {
  userId: number;
  activityIds: number[];
};
export type LogIndustryDto = {
  userId: number;
  industryId: number[];
};
export type ResetPassword = {
  email: string;

  newPassword: string;
};

export type IUser = {
  name: string;
  userType: any;
  jobTitle: any;
  officeEmail: string;
  officePhoneNumber: string;
  officeAddress: any;
  officeCity: any;
  officeState: any;
  officeCountry: any;
  usageLocation: string;

  customerCode: string;
  language: {
    id: number;
    languageName: string;
    languageCode: string;
  };
  isEnabled: number;
  enabledAt: number;
  isValidated: number;
  isDeleted: number;
  deletedAt: any;
  createdBy: string;
  createdAt: string;
  onboardingCompleted: boolean;
  passwordUpdatedAt: any;
  roles: Irole[];
  id: number;
};

export type Irole = {
  id: number;
  roleName: string;
  description: string;
  // roleType: string;
  // isCustom: number;
  // policies: [];
};
export type IActivity = {
  id: number;
  activityName: string;
  activityCode: string;
};
export type IIndustry = {
  industryId: number;
  name: string;
};
