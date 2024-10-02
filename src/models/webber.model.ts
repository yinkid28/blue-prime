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
  appCode?: string;
  applicationCode?: string;
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
export type IAddProperties = {
  application_access_token_expiry_time: string;
  user_access_token_expiry_time: string;
  refresh_token_expiry_time: string;
  id_token_expiry_time: string;
  pkceMandatory: boolean;
  pkceSupportPlain: boolean;
  bypassClientCredentials: boolean;
};
export type GenerateAppOauthKeys = {
  keyType: string;
  grantTypesToBeSupported: string[];
  callbackUrl: string;
  additionalProperties: IAddProperties;
  keyManager: string;
  validityTime: number;
  scopes: string[];
};

export type OauthKeys = {
  id: string;
  createdBy: any;
  createdDate: string;
  lastModifiedBy: any;
  lastModifiedDate: string;
  keyMappingId: string;
  keyMappingCode: string;
  keyManager: string;
  consumerKey: string;
  consumerSecret: string;
  supportedGrantTypes: string[];
  callbackUrl: string;
  keyState: string;
  keyType: string;
  mode: string;
  groupId: any;
  token: {
    accessToken: string;
    validityTime: number;
  };
  tokenScopes: string[];
  additionalProperties: IAddProperties;
  deleted: boolean;
};

export type editOauthDto = {
  keyManager: string;
  supportedGrantTypes: string[];
  callbackUrl: string;
  keyState: string;
  keyType: string;
  mode: string;
  additionalProperties: IAddProperties;
};
