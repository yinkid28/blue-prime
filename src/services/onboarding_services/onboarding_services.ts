import {
  LogActivityDto,
  LogIndustryDto,
  RegisterUserDto,
  ResetPassword,
  ResetTokenDto,
  SignInDto,
  VerifyTokenDto,
} from "@/models/onboarding.model";
import HTTPClient from "../httpInstance/wrappedinstance";

export default class OnboardingServices {
  static async RegisterUser(data: RegisterUserDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/useronboarding",
      data
    );
    return response.data;
  }
  static async signInUser(data: SignInDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/publicsignin",
      data
    );
    return response.data;
  }
  static async getAllIndustries() {
    const response = await HTTPClient.get(
      "/onboarding-and-rbac/api/industries"
    );
    return response.data;
  }
  static async getUser(id: number) {
    const response = await HTTPClient.get(
      `/onboarding-and-rbac/api/get_user_by_id/${id}`
    );
    return response.data;
  }
  static async getAllIntentions() {
    const response = await HTTPClient.get(
      "/onboarding-and-rbac/api/user-activities"
    );
    return response.data;
  }
  static async ResetToken(data: ResetTokenDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/useronboarding",
      data
    );
    return response.data;
  }
  static async VerifyToken(data: VerifyTokenDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/verifyToken",
      data
    );
    return response.data;
  }
  static async VerifyPasswordToken(data: VerifyTokenDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/verify_forgot_password_token",
      data
    );
    return response.data;
  }
  static async logUserIntentions(data: LogActivityDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/user-activity-logs",
      data
    );
    return response.data;
  }
  static async logUserIndustries(data: LogIndustryDto) {
    const response = await HTTPClient.post(
      "/onboarding-and-rbac/api/user-industry-logs",
      data
    );
    return response.data;
  }
  static async requestForgotPassword(email: string) {
    const response = await HTTPClient.post(
      `/onboarding-and-rbac/api/forgotPassword/${email}`,
      undefined
    );
    return response.data;
  }
  static async resetPassword(data: ResetPassword) {
    const response = await HTTPClient.post(
      `/onboarding-and-rbac/api/resetPassword`,
      data
    );
    return response.data;
  }
  static async ForgotPassword(data: ResetPassword) {
    const response = await HTTPClient.post(
      `/onboarding-and-rbac/api/resetPassword`,
      data
    );
    return response.data;
  }
}
