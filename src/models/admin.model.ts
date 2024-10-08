export type createCategory = {
  name: string;
  description: string;
};

export type ICategory = {
  apiApprovalCriteria: any;
  categoryCode: string;
  description: string;
  id: string;
  name: string;
  numberOfAPIs: number;
};
