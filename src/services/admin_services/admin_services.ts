import HTTPClient from "../httpInstance/wrappedinstance";

export default class AdminServices {
  static async getApplicationThrottlingPolicies() {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/throttling/policies/application/get-all`
    );
    return response.data;
  }

  static async deleteApplicationThrottlingPolicy(policyId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/throttling/policies/application/delete?policyId=${policyId}`
    );
    return response.data;
  }
  static async getIndividualSubscriptionPolicy(policyId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/throttling/policies/subscription/get?policyId=${policyId}`
    );
    return response.data;
  }
  static async deleteIndividualSubscriptionPolicy(policyId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/back-office/throttling/policies/subscription/delete?policyId=${policyId}`
    );
    return response.data;
  }
}
