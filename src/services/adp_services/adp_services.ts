import HTTPClient from "../httpInstance/wrappedinstance";

export default class ADPServices {
  static async UploadAdp(data: any) {
    const response = await HTTPClient.formDataPost(
      `/upload/api/excel/upload`,
      data
    );
    return response.data;
  }
  static async UploadAdpasDraft(data: any) {
    const response = await HTTPClient.formDataPost(
      `upload/api/excel/upload/draft`,
      data
    );
    return response.data;
  }
  static async getExcelRecordsById(id: number) {
    const response = await HTTPClient.get(`/upload/api/excel/records/${id}`);
    return response.data;
  }
  static async getTemplateData(id: number) {
    const response = await HTTPClient.get(`/upload/api/dashboard/stats/${id}`);
    return response.data;
  }
  static async getMonthlyTrend(id: number) {
    const response = await HTTPClient.get(
      `/upload/api/dashboard/monthlyTrend/${id}`
    );
    return response.data;
  }
  static async getBuyerTrend(id: number) {
    const response = await HTTPClient.get(
      `/upload/api/dashboard/buyerTrend/${id}`
    );
    return response.data;
  }
  static async getAllAdpUploads(
    pageNo: number = 0,
    pageSize: number,
    keyword?: string
  ) {
    const response = await HTTPClient.get(
      `upload/api/excel/templates/${pageNo}/${pageSize}?sortBy=id&direction=dsc${
        keyword ? `&keyword=${keyword}` : ""
      }`
    );
    return response.data;
  }
  static async SaveTemplateById(id: number) {
    const response = await HTTPClient.post(
      `/upload/api/excel/save/${id}`,
      undefined
    );
    return response.data;
  }
}
