export type CreateAPI = {
  name: string;
  description: string;
  context: string;
  version: string;
  provider: string;
  lifeCycleStatus: string;
  responseCachingEnabled: boolean;
  hasThumbnail: boolean;
  isDefaultVersion: boolean;
  enableSchemaValidation: boolean;
  type: string;
  transport: string[];
  tags?: string[];
  policies: string[];
  apiThrottlingPolicy: string;
  securityScheme: string[];
  maxTps: MaxTp;
  visibility: string;
  visibleRoles: any[];
  visibleTenants: any[];
  subscriptionAvailability: string;
  additionalProperties: AdditionalProps[];
  accessControl: string;
  businessInformation: BusinessInformation;
  endpointConfig: EndpointConfig;
  operations?: IOperation[];
  categories?: string[];
};
export type MaxTp = {
  production: number;
  sandbox: number;
};
export type AdditionalProps = {
  name: string;
  value: string;
  display: boolean;
};
export type BusinessInformation = {
  businessOwner: string;
  businessOwnerEmail: string;
  technicalOwner: string;
  technicalOwnerEmail: string;
};

export type IOperation = {
  target: string;
  verb: string;
  authType: string;
  throttlingPolicy: string;
  scopes?: any[];
  usedProductIds?: any[];
  operationPolicies?: {
    request: any[];
    response: any[];
    fault: any[];
  };
};

export type EndpointConfig = {
  endpoint_type: string;
  sandbox_endpoints: {
    url: string;
  };
  production_endpoints: {
    url: string;
  };
};

export type IRevision = {
  displayName: string;
  id: string;
  description: string;
  createdTime: string;
  apiInfo: {
    id: string;
  };
  deploymentInfo: IDeploymentInfo[];
  revisionCode: string;
};
export type DeployRevisionDto = {
  name: string;
  vhost: string;
  displayOnDevportal: boolean;
};

export type IDeploymentInfo = {
  revisionUuid: string;
  name: string;
  vhost: string;
  displayOnDevportal: boolean;
  deployedTime: string;
  successDeployedTime: any;
};

export type IComment = {
  id: string;
  content: string;
  createdTime: string;
  createdBy: string;
  updatedTime: string;
  category: string;
  entryPoint: string;
  replies: IReply;
};
export type IReply = {
  count: number;
  list: IComment[];
  pagination: {
    offset: any;
    limit: any;
    total: number;
    next: any;
    previous: any;
  };
};
export type IApi = {
  monetization: {
    enabled: boolean;
    properties: {
      additionalProp1: string;
      additionalProp2: string;
      additionalProp3: string;
    };
  };
  authorizationHeader?: string;
  customerCode?: string;
  wso2ApiId: string;
  apiCode: string;
  id: string;
  name: string;
  description: string;
  context: string;
  version: string;
  provider: string;
  lifeCycleStatus: string;
  responseCachingEnabled: boolean;
  cacheTimeout: number;
  hasThumbnail: boolean;
  isDefaultVersion: boolean;
  isRevision: boolean;
  revisionId: string;
  enableSchemaValidation: boolean;
  enableSubscriberVerification: boolean;
  type: string;
  transport: string[];
  tags: string[];
  policies: string[];
  apiThrottlingPolicy: string;
  securityScheme: string[];
  maxTps: MaxTp;
  visibility: string;
  visibleRoles: any[];
  visibleTenants: any[];
  mediationPolicies: any[];
  subscriptionAvailability: string;
  subscriptionAvailableTenants: any[];
  additionalProperties: AdditionalProps[];
  additionalPropertiesMap: {
    AdditionalProperty__display: AdditionalProps;
  };
  accessControl: string;
  accessControlRoles: any[];
  businessInformation: BusinessInformation;
  corsConfiguration: corsConfig;
  websubSubscriptionConfiguration: websubSubsription;
  createdTime: string;
  lastUpdatedTimestamp: string;
  endpointConfig: EndpointConfig;
  endpointImplementationType: string;
  scopes: any[];
  operations: IOperation[];
  categories: any[];
  advertiseInfo: {
    advertised: boolean;
    vendor: string;
  };
  gatewayVendor: string;
  asyncTransportProtocols: any[];
};
export type websubSubsription = {
  enable: boolean;
  secret: string;
  signingAlgorithm: string;
  signatureHeader: string;
};
export type corsConfig = {
  corsConfigurationEnabled: boolean;
  accessControlAllowOrigins: string[];
  accessControlAllowCredentials: boolean;
  accessControlAllowHeaders: string[];
  accessControlAllowMethods: string[];
};
export type SwaggerParam = {
  name: string;
  in: string;
  required: boolean;
  style: string;
  explode: boolean;
  schema: {
    type: string;
  };
};
export type SwaggerOperation = {
  parameters: SwaggerParam[];
  description: string;

  summary: string;

  responses: {
    "200": {
      description: string;
    };
  };
  security: [
    {
      default: [];
    }
  ];
  "x-auth-type": string;
  "x-throttling-tier": string;
  "x-wso2-application-security": {
    "security-types": string[];
    optional: boolean;
  };
};
export type IPolicy = {
  name: string;
  description: string;
  policyLevel: string;
  displayName: string;
  attributes: any;
  requestCount: number;
  dataUnit: any;
  unitTime: number;
  timeUnit: string;
  rateLimitCount: number;
  rateLimitTimeUnit: any;
  quotaPolicyType: string;
  tierPlan: any;
  stopOnQuotaReach: boolean;
  monetizationProperties: any;
};
