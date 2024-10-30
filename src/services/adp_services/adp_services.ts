import HTTPClient from "../httpInstance/wrappedinstance";

export default class ADPServices {
  static async UploadAdp(data: any) {
    const response = await HTTPClient.formDataPost(
      `/upload/api/excel/upload`,
      data
    );
    return response.data;
  }
  static async getExcelRecordsById(id: number) {
    const response = await HTTPClient.get(`/upload/api/excel/records/${id}`);
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
