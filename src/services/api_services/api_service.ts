import { CreateAPI } from "@/models/api.model";
import HTTPClient from "../httpInstance/wrappedinstance";

export default class APIServices {
  static async getAllApibyCustomerCode(
    cco: string,
    pageNo: number = 1,
    pageSize: number
  ) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/apim-api/get-apis?cco=${cco}&pageNo=${pageNo}&pageSize=${pageSize}`
    );
    return response.data;
  }
  static async getAllWebberApis(pageNo: number = 1, pageSize: number) {
    const response = await HTTPClient.get(
      `api-manager/api/devportal/v3/get-apis?limit=${pageSize}&offset=${pageNo}`
    );
    return response.data;
  }
  static async getOutofTheBoxPolicies(
    policyLevel: string,
    pageNo: number = 1,
    pageSize: number
  ) {
    const response = await HTTPClient.get(
      `/api-manager/apim/v1/weaver/throttling-policies?policyLevel=${policyLevel}&limit=${pageSize}&offset=${pageNo}`
    );
    return response.data;
  }
  static async getSingleApi(aco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/apim-api/get?aco=${aco}`
    );
    return response.data;
  }
  static async getApiThumbnail(aco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/apim-api/get-thumbnail?aco=${aco}`
    );
    return response.data;
  }
  static async deleteApiRevision(aco: string, rco: string) {
    const response = await HTTPClient.delete(
      `api-manager/apim/v1/weaver/revision/delete?aco=${aco}&rco=${rco}`
    );
    return response.data;
  }
  static async getApiRevisions(aco: string, query?: boolean) {
    const response = await HTTPClient.get(
      `api-manager/apim/v1/weaver/revision/get-all?aco=${aco}${
        query ? "&query=deployed:true" : ""
      }`
    );
    return response.data;
  }
  static async getApiSwaggerDefition(aco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/apim-api/get-api-swagger-definition?aco=${aco}`
    );
    return response.data;
  }
  static async getRevisionSwaggerDefition(rco: string) {
    const response = await HTTPClient.get(
      `api-manager/api/v1/apim-api/get-revision-swagger-definition?rco=${rco}`
    );
    return response.data;
  }
  static async deleteCommentbyApicode(aco: string, commId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/publisher/v4/apis/${aco}/comments/${commId}/replies`
    );
    return response.data;
  }
  static async getRepliesToComment(aco: string, commId: string) {
    const response = await HTTPClient.get(
      `api-manager/api/publisher/v4/apis/${aco}/comments/${commId}/replies`
    );
    return response.data;
  }
  static async getCommentsByApiCode(
    aco: string,
    limit: number,
    offset: number
  ) {
    const response = await HTTPClient.get(
      `/api-manager/api/publisher/v4/apis/${aco}/comments?limit=${limit}&offset=${offset}&includeCommenterInfo=false`
    );
    return response.data;
  }
  static async createApi(data: any, cco: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/apim-api/create?cco=${cco}`,
      data
    );
    return response.data;
  }
  static async createRevision(data: any, aco: string) {
    const response = await HTTPClient.post(
      `/api-manager/apim/v1/weaver/revision/create?aco=${aco}`,
      data
    );
    return response.data;
  }
  static async createComment(data: any, aco: string, to?: string) {
    const response = await HTTPClient.post(
      `/api-manager/api/publisher/v4/apis/${aco}/comments${
        to ? `?replyTo=${to}` : ""
      }`,
      data
    );
    return response.data;
  }
  static async deployRevision(data: any, aco: string, revId: string) {
    const response = await HTTPClient.post(
      `api-manager/apim/v1/weaver/revision/deploy?aco=${aco}&rco=${revId}`,
      data
    );
    return response.data;
  }
  static async undeployRevision(data: any, aco: string, revId: string) {
    const response = await HTTPClient.post(
      `api-manager/apim/v1/weaver/revision/undeploy?aco=${aco}&rco=${revId}`,
      data
    );
    return response.data;
  }
  static async restoreRevision(data: any, aco: string, revId: string) {
    const response = await HTTPClient.post(
      `api-manager/apim/v1/weaver/revision/restore?aco=${aco}&rco=${revId}`,
      data
    );
    return response.data;
  }
  static async deleteRevision(data: any, aco: string, revId: string) {
    const response = await HTTPClient.post(
      `api-manager/apim/v1/weaver/revision/delete?aco=${aco}&rco=${revId}`,
      data
    );
    return response.data;
  }
  static async updateApi(data: any, cco: string) {
    const response = await HTTPClient.put(
      `api-manager/api/v1/apim-api/update?aco=${cco}`,
      data
    );
    return response.data;
  }
  static async updateApiSwaggerDefinition(data: any, cco: string) {
    const response = await HTTPClient.put(
      `api-manager/api/v1/apim-api/update-api-swagger-definition?aco=${cco}`,
      data
    );
    return response.data;
  }
  static async updateRevisionSwaggerDefinition(data: any, cco: string) {
    const response = await HTTPClient.put(
      `api-manager/api/v1/apim-api/update-revision-swagger-definition?rco=${cco}`,
      data
    );
    return response.data;
  }
  static async importWsdl(data: any, cco?: string) {
    const response = await HTTPClient.formDataPost(
      `api-manager/api/v1/apim-api/import-wsdl?cco=${cco}`,
      data
    );
    return response.data;
  }
  static async importOpenApi(data: any, cco?: string) {
    const response = await HTTPClient.formDataPost(
      `api-manager/api/v1/apim-api/import-open-api-definition?cco=${cco}`,
      data
    );
    return response.data;
  }
  static async updateApiImg(data: any, cco: string) {
    const response = await HTTPClient.formDataPut(
      `api-manager/api/v1/apim-api/${cco}/thumbnail`,
      data
    );
    return response.data;
  }
  static async updateApiLifeCycle(aco: string, action: string, life?: string) {
    const response = await HTTPClient.post(
      `/api-manager/api/v1/apim-api-lifecycle/change-api-status?aco=${aco}&action=${action}${
        life ? `&lifecycleChecklist=${life}` : ""
      }`,
      undefined
    );
    return response.data;
  }
  static async deleteApi(aco: string) {
    const response = await HTTPClient.delete(
      `api-manager/api/v1/apim-api/delete?aco=${aco}`
    );
    return response.data;
  }
}
