import { CreateAPI } from "@/models/api.model";
import HTTPClient from "../httpInstance/wrappedinstance";

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

  static async getsubcribedAppsbyApiCode(aco: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/webber/subscriptions/get-all?apiId=${aco}&limit=25`,
      undefined
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
  static async createApplication(data: any) {
    const response = await HTTPClient.post(
      `/api-manager/api/v1/webber/application/create`,
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
  static async deleteApi(aco: string) {
    const response = await HTTPClient.delete(
      `api-manager/api/v1/weaver/api/delete?aco=${aco}`
    );
    return response.data;
  }
}
