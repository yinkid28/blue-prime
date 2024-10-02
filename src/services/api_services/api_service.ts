import { CreateAPI } from "@/models/api.model";
import HTTPClient from "../httpInstance/wrappedinstance";
import {
  editOauthDto,
  GenerateAccessToken,
  GenerateAppOauthKeys,
} from "@/models/webber.model";

export default class APIServices {
  static async getAllApibyCustomerCode(
    cco: string,
    pageNo: number = 1,
    pageSize: number
  ) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/weaver/api/get-apis?cco=${cco}&pageNo=${pageNo}&pageSize=${pageSize}`
    );
    return response.data;
  }
  static async getAllWebberApis(pageNo: number = 1, pageSize: number) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/apis/get-all?pageNumber=${pageNo}&pageSize=${pageSize}`
    );
    return response.data;
  }
  static async getOutofTheBoxPolicies(
    policyLevel: string,
    pageNo: number = 1,
    pageSize: number
  ) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/weaver/subscription/throttling-policies?policyLevel=${policyLevel}&limit=${pageSize}&offset=${pageNo}`
    );
    return response.data;
  }
  static async getSingleApi(aco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/weaver/api/get?aco=${aco}`
    );
    return response.data;
  }

  static async getSingleApiDev(aco: string) {
    const response = await HTTPClient.get(
      `/api-manager/api/v1/webber/apis/get?aco=${aco}`
    );
    return response.data;
  }

  static async getApiThumbnail(aco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/weaver/api/get-thumbnail?aco=${aco}`
    );
    return response.data;
  }
  static async deleteApiRevision(aco: string, rco: string) {
    const response = await HTTPClient.delete(
      `api-manager/api/v1/weaver/revision/delete?aco=${aco}&rco=${rco}`
    );
    return response.data;
  }
  static async getApiRevisions(aco: string, query?: boolean) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/weaver/revision/get-all?aco=${aco}${
        query ? "&query=deployed:true" : ""
      }`
    );
    return response.data;
  }
  static async getApiSwaggerDefition(aco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/weaver/api/get-api-swagger-definition?aco=${aco}`
    );
    return response.data;
  }
  static async getRevisionSwaggerDefition(rco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/weaver/api/get-revision-swagger-definition?rco=${rco}`
    );
    return response.data;
  }
  static async deleteCommentbyApicode(aco: string, commId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/weaver/comment/delete?aco=${aco}&commentId=${commId}`
    );
    return response.data;
  }
  static async getRepliesToComment(aco: string, commId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/weaver/comment/replies?aco=${aco}&commentId=${commId}`
    );
    return response.data;
  }

  static async getSingleApp(appco: string) {
    const response = await HTTPClient.get(
      `/api-manager/api/v1/webber/application/applications/${appco}`
    );
    return response.data;
  }
  static async getCommentsByApiCode(
    aco: string,
    limit: number,
    offset: number
  ) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/weaver/comment/get-list?aco=${aco}&limit=${limit}&offset=${offset}&includeCommenterInfo=false`
    );
    return response.data;
  }
  static async createApi(data: any, cco: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/weaver/api/create?cco=${cco}`,
      data
    );
    return response.data;
  }
  static async getbookmarkApi(cco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/bookmarks/get?cco=${cco}`
    );
    return response.data;
  }
  static async bookmarkApi(aco: string, cco: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/webber/bookmarks/add?cco=${cco}&aco=${aco}`,
      undefined
    );
    return response.data;
  }

  static async subscribeApptoApi(
    aco: string,
    throttling: string,
    appco: string
  ) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/webber/subscriptions/create?aco=${aco}&appco=${appco}&throttlingPolicy=${throttling}`,
      undefined
    );
    return response.data;
  }

  static async getSubcribedAppsbyApiCode(aco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/subscriptions/get-all?aco=${aco}&limit=25`
    );
    return response.data;
  }

  static async getSubscriptionsBySubco(subco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/subscriptions/get?subco=${subco}`
    );
    return response.data;
  }

  static async getAdditionalSubscriptionInfo(
    aco: string,
    groupId: string,
    limit: number = 25
  ) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/subscriptions/additionalInfo?aco=${aco}&groupId=${groupId}&limit=${limit}`
    );
    return response.data;
  }

  static async generateTokenWeaver(aco: string) {
    const response = await HTTPClient.post(
      `/api-manager/api/v1/weaver/api/generate-api-key?aco=${aco}`,
      undefined
    );
    return response.data;
  }
  static async removebookmarkApi(aco: string, cco: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/webber/bookmarks/remove?cco=${cco}&aco=${aco}`,
      undefined
    );
    return response.data;
  }
  static async createApplication(cco: string, data: any) {
    const response = await HTTPClient.post(
      `/api-manager/api/v1/webber/application/create?cco=${cco}`,
      data
    );
    return response.data;
  }
  static async createRevision(data: any, aco: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/weaver/revision/create?aco=${aco}`,
      data
    );
    return response.data;
  }
  static async createComment(data: any, aco: string, to?: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/weaver/comment/create?aco=${aco}${
        to ? `&replyTo=${to}` : ""
      }`,
      data
    );
    return response.data;
  }

  static async deployRevision(data: any, aco: string, revId: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/weaver/revision/deploy?aco=${aco}&rco=${revId}`,
      data
    );
    return response.data;
  }
  static async undeployRevision(data: any, aco: string, revId: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/weaver/revision/undeploy?aco=${aco}&rco=${revId}`,
      data
    );
    return response.data;
  }
  static async restoreRevision(data: any, aco: string, revId: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/weaver/revision/restore?aco=${aco}&rco=${revId}`,
      data
    );
    return response.data;
  }
  static async deleteRevision(data: any, aco: string, revId: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/weaver/revision/delete?aco=${aco}&rco=${revId}`,
      data
    );
    return response.data;
  }
  static async updateApi(data: any, cco: string) {
    const response = await HTTPClient.put(
      `api-manager/api/v1/weaver/api/update?aco=${cco}`,
      data
    );
    return response.data;
  }
  static async updateApiSwaggerDefinition(data: any, cco: string) {
    const response = await HTTPClient.put(
      `api-manager/api/v1/weaver/api/update-api-swagger-definition?aco=${cco}`,
      data
    );
    return response.data;
  }
  static async updateApiSwaggerDefinitionFile(data: any, cco: string) {
    const response = await HTTPClient.formDataPut(
      `api-manager/api/v1/weaver/api/update-api-swagger-definition?aco=${cco}`,
      data
    );
    return response.data;
  }
  static async updateRevisionSwaggerDefinition(data: any, cco: string) {
    const response = await HTTPClient.put(
      `api-manager/api/v1/weaver/api/update-revision-swagger-definition?rco=${cco}`,
      data
    );
    return response.data;
  }
  static async importWsdl(data: any, cco?: string) {
    const response = await HTTPClient.formDataPost(
      `api-manager/api/v1/weaver/api/import-wsdl?cco=${cco}`,
      data
    );
    return response.data;
  }
  static async importOpenApi(data: any, cco?: string) {
    const response = await HTTPClient.formDataPost(
      `api-manager/api/v1/weaver/api/import-open-api-definition?cco=${cco}`,
      data
    );
    return response.data;
  }
  static async validateOpenApi(data: any) {
    const response = await HTTPClient.formDataPost(
      `api-manager/api/v1/weaver/validation/open-api?returnContent=true`,
      data
    );
    return response.data;
  }
  static async validateWsdl(data: any) {
    const response = await HTTPClient.formDataPost(
      `api-manager/api/v1/weaver/validation/wsdl`,
      data
    );
    return response.data;
  }
  static async updateApiImg(data: any, cco: string) {
    const response = await HTTPClient.formDataPut(
      `api-manager/api/v1/weaver/api/${cco}/thumbnail`,
      data
    );
    return response.data;
  }
  static async updateApiLifeCycle(aco: string, action: string, life?: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/weaver/lifecycle/change-api-status?aco=${aco}&action=${action}${
        life ? `&lifecycleChecklist=${life}` : ""
      }`,
      undefined
    );
    return response.data;
  }
  static async requestPublishing(aco: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/weaver/lifecycle/request-publishing?aco=${aco}&request=true`,
      undefined
    );
    return response.data;
  }
  static async deleteApi(aco: string) {
    const response = await HTTPClient.delete(
      `api-manager/api/v1/weaver/api/delete?aco=${aco}`
    );
    return response.data;
  }

  static async deleteWebberCommentbyApicode(aco: string, commId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/vi/webber/comments/delete?aco=${aco}&commentId=${commId}`
    );
    return response.data;
  }

  static async getWebberRepliesToComment(aco: string, commId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/comments/replies?aco=${aco}&commentId=${commId}`
    );
    return response.data;
  }

  static async createWebberComment(data: any, aco: string, to?: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/webber/comments/add?aco=${aco}${
        to ? `&replyTo=${to}` : ""
      }`,
      data
    );
    return response.data;
  }

  static async getWebberCommentsByApiCode(
    aco: string,
    limit: number,
    offset: number
  ) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/comments/get-list?aco=${aco}&limit=${limit}&offset=${offset}`
    );
    return response.data;
  }

  static async getWebberCommentDetail(aco: string, commentId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/comments/get-detail?aco=${aco}&commentId=${commentId}`
    );
    return response.data;
  }

  static async getAllWebberThrottlingPolicies(
    policyLevel: string,
    policyName: string
  ) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/throttling-policy/get-all?policyLevel=${policyLevel}&policyName=${policyName}`
    );
    return response.data;
  }
  static async updateWebberApplication(appco: string, data: any) {
    const response = await HTTPClient.put(
      `api-manager/api/v1/webber/application/update?appco=${appco}`,
      data
    );
    return response.data;
  }

  static async getWebberApplication(appco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/application/get?appco=${appco}`
    );
    return response.data;
  }
  static async deleteOauthKeysforApplication(appco: string, kmco: string) {
    const response = await HTTPClient.delete(
      `/api-manager/api/v1/webber/applications/delete?appco=${appco}&kmco=${kmco}`
    );
    return response.data;
  }
  static async editOauthKeysforApplication(
    appco: string,
    kmco: string,
    data: editOauthDto
  ) {
    const response = await HTTPClient.put(
      `/api-manager/api/v1/webber/applications/update?appco=${appco}&kmco=${kmco}`,
      data
    );
    return response.data;
  }
  static async getOauthKeysforApplication(appco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/applications/oauth-keys?appco=${appco}`
    );
    return response.data;
  }
  static async generataOauthKeysforApplication(
    appco: string,
    data: GenerateAppOauthKeys
  ) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/webber/applications/generate?appco=${appco}`,
      data
    );
    return response.data;
  }
  static async generateAccessTokenforApplication(
    appco: string,
    kmco: string,
    data: GenerateAccessToken
  ) {
    const response = await HTTPClient.post(
      `/api-manager/api/v1/webber/applications/generate-token?appco=${appco}&kmco=${kmco}`,
      data
    );
    return response.data;
  }
  static async getAllKeyManagers() {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/key-managers/get-all`
    );
    return response.data;
  }

  static async getAllWebberApplications(
    pageNumber: number = 1,
    pageSize: number,
    cco: string
  ) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/webber/application/get-all?cco=${cco}&pageSize=${pageSize}&pageNo=${pageNumber}`
    );
    return response.data;
  }

  static async deleteWebberApplication(appco: string) {
    const response = await HTTPClient.delete(
      `api-manager/api/v1/webber/application/delete?appco=${appco}`
    );
    return response.data;
  }
}
