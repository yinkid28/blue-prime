export type RequestCardProps = {
  title: string;
  children: React.ReactNode;
};

export type tableTypes = {
  date: string;
  appName: string;
  plan: string;
  price: string;
  paymentMethod: string;
  paymentStatus: string;
};

export interface SubscribedApp {
  id: number;
  name: string;
  amount: number;
  req: number;
  date: string;
}

export type IApplication = {
  id: string;
  createdBy: any;
  createdDate: string;
  lastModifiedBy: any;
  lastModifiedDate: string;
  applicationCode: string;
  customerCode: string;
  applicationId: string;
  name: string;
  throttlingPolicy: string;
  description: string;
  tokenType: string;
  status: string;
  groups: any[];
  subscriptionCount: number;
  keys: any[];
  attributes: any[];
  subscriptionScopes: any[];
  owner: string;
  hashEnabled: boolean;
  createdTime: string;
  updatedTime: string;
  deleted: boolean;
  
};
