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
  static async createApi(data: CreateAPI, cco: string) {
    const response = await HTTPClient.post(
      `api-manager/api/v1/apim-api/create?cco=${cco}`,
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
  static async importWsdl(data: any, cco?: string) {
    const response = await HTTPClient.formDataPost(
      `api-manager/api/v1/apim-api/import-wsdl`,
      data
    );
    return response;
  }
  static async updateApiImg(data: any, cco: string) {
    const response = await HTTPClient.formDataPut(
      `api-manager/api/v1/apim-api/${cco}/thumbnail`,
      data
    );
    return response;
  }
  static async deleteApi(aco: string) {
    const response = await HTTPClient.delete(
      `api-manager/api/v1/apim-api/delete?aco=${aco}`
    );
    return response.data;
  }
}
