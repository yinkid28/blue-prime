export type IMockADP = {
  name: string;
  lastModified: string;
  Author: string;
  product: string;
  status: string;
};
export type IUploadError = {
  ColumnName: string;
  Message: string;
  Column: number;
  Row: number;
};
export type IADPTemplate = {
  id: number;
  templateDescription: string;
  templateYear: number;
  product: string;
  filePath: string;
  createdAt: string;
  createdBy: string;
  version: number;

  updatedBy: string;
  updatedAt: string;
  status: "DRAFT" | "INACTIVE" | "ACTIVE";
};

export type AdpDashboardData = {
  total_BUYERS: number;
  total_CARGOS: number;
  total_QTY: number;
  top_3_BUYERS: string;
  top_3_BUYERS_PERCENTAGE: string;
  busiest_TERMINAL: string;
  busiest_TERMINAL_FREQUENCY: string;
};
