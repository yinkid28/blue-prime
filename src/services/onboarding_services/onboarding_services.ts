import {
  RegisterUserDto,
  ResetTokenDto,
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
}
