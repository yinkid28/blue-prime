import Navbar from "@/components/Layout/Nav/navbar";
import {
  BreadCrumbItems,
  BreadCrumbs,
  Button,
  Loader,
  Table,
} from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import {
  Spinner,
  Switch,
  UseToastOptions,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getFormattedDate } from "@/helper_utils/helpers";
import APIServices from "@/services/api_services/api_service";
import CopyIcon from "../../../../../../public/icons/copyicon";
import {
  editOauthDto,
  GenerateAccessToken,
  GenerateAppOauthKeys,
  IApplication,
  OauthKeys,
} from "@/models/webber.model";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ApplicationAccessToken from "@/components/modals/ApplicationAccessToken";

// remember to use static generation here but for now we will use context to get current api
const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
const allGrants = [
  { displayName: "Password", value: "password" },
  { displayName: "Client Credientials", value: "client_credentials" },
  {
    displayName: "JWT",
    value: "urn:ietf:params:oauth:grant-type:jwt-bearer",
  },
  { displayName: "Refresh Token", value: "refresh_token" },
  {
    displayName: "SAML2",
    value: "urn:ietf:params:oauth:grant-type:saml2-bearer",
  },
  {
    displayName: "device code",
    value: "urn:ietf:params:oauth:grant-type:device_code",
  },
  { displayName: "IWA-NLTM", value: "iwa:ntlm" },
  {
    displayName: "urn:ietf:params:oauth:grant-type:token-exchange",
    value: "urn:ietf:params:oauth:grant-type:token-exchange",
  },
];

// USE appCO
export default function AppDetails() {
  const { api, setApi, currentApplication } = useApi();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const { appCo } = router.query;
  const { setSidebar, setApiErrorMessage } = useOnboarding();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [view, setView] = useState<string>("PRODUCTION");
  const [application, setApplication] = useState<IApplication>();
  const [defaultKeyManager, setDefaultKeyManager] = useState<any>();
  const [productionApplicationKeys, setproductionApplicationKeys] = useState<
    OauthKeys[]
  >([]);
  const [sandboxApplicationKeys, setSandboxApplicationKeys] = useState<
    OauthKeys[]
  >([]);
  const [selectedGrants, setSelectedGrants] = useState<string[]>([]);
  const [sandBoxselectedGrants, setSandboxSelectedGrants] = useState<string[]>(
    []
  );
  const [appTokenExpiryTime, setAppTokenExpiryTime] = useState<string>("N/A");
  const [userAccessTokenExpiryTime, setUserAccessTokenExpiryTime] =
    useState<string>("N/A");
  const [idTokenExpiryTime, setIdTokenExpiryTime] = useState<string>("N/A");
  const [refreshTokenExpiryTime, setRefreshTokenExpiryTime] =
    useState<string>("N/A");
  const [showKey, setShowKey] = useState<boolean>(false);
  const [publicClient, setPublicClient] = useState<boolean>(false);
  const [pkce, setPkce] = useState<boolean>(false);
  const [pckcePlain, setPkcePlain] = useState<boolean>(false);
  const [sandboxappTokenExpiryTime, setsandboxAppTokenExpiryTime] =
    useState<string>("N/A");
  const [
    sandboxuserAccessTokenExpiryTime,
    setsandboxUserAccessTokenExpiryTime,
  ] = useState<string>("N/A");
  const [sandboxidTokenExpiryTime, setsandboxIdTokenExpiryTime] =
    useState<string>("N/A");
  const [sandboxrefreshTokenExpiryTime, setsandboxRefreshTokenExpiryTime] =
    useState<string>("N/A");
  const [sandboxpublicClient, setsandboxPublicClient] =
    useState<boolean>(false);
  const [sandboxpkce, setsandboxPkce] = useState<boolean>(false);
  const [sandboxpckcePlain, setsandboxPkcePlain] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [validity, setValidity] = useState<number>(0);

  useEffect(() => {
    setSidebar("appDetails");
    if (appCo) {
      fetchApplicationDetails(appCo as string);
      getAllKeyManagers();
      fetchOauthKeysbyAppco(appCo as string);
    }
  }, [appCo, view]);

  useEffect(() => {
    console.log(sandboxApplicationKeys);
  }, [sandboxApplicationKeys]);

  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Library",
      breadCrumbPath: `/webber/library`,
    },
    {
      breadCrumbText: `applications`,
      breadCrumbPath: `/webber/library/application`,
    },
    {
      breadCrumbText: `${currentApplication?.name}`,
      breadCrumbPath: `/webber/library/application/${currentApplication?.name}?appCo=${currentApplication?.applicationCode}`,
    },
  ];

  //   Endpoint to fetch application
  const fetchApplicationDetails = async (appco: string) => {
    try {
      setLoading(true);
      const response = await APIServices.getWebberApplication(appco);
      if (response.statusCode === 200) {
        setApplication(response.data);
      } else {
        throw new Error("Failed to fetch application details");
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch application details";
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  //   Fetching oauth keys, can return a list of oauth keys for test and production environment
  const fetchOauthKeysbyAppco = async (appco: string) => {
    try {
      setLoading(true);
      const response = await APIServices.getOauthKeysforApplication(appco);
      if (response.statusCode === 200) {
        const prodKeys: OauthKeys[] = response.data.list.filter(
          (item: OauthKeys) => item.keyType.toLowerCase() === "production"
        );
        const sandKeys: OauthKeys[] = response.data.list.filter(
          (item: OauthKeys) => item.keyType.toLowerCase() === "sandbox"
        );

        console.log(prodKeys, sandKeys);
        if (prodKeys.length > 0) {
          setproductionApplicationKeys(prodKeys);
          setSelectedGrants(prodKeys[0].supportedGrantTypes);
          setPkce(prodKeys[0].additionalProperties.pkceMandatory);
          setPkcePlain(prodKeys[0].additionalProperties.pkceSupportPlain);
          setPublicClient(
            prodKeys[0].additionalProperties.bypassClientCredentials
          );
        }
        if (sandKeys.length > 0) {
          setSandboxSelectedGrants(sandKeys[0].supportedGrantTypes);
          setSandboxApplicationKeys(sandKeys);
          setsandboxPkce(sandKeys[0].additionalProperties.pkceMandatory);
          setsandboxPkcePlain(
            sandKeys[0].additionalProperties.pkceSupportPlain
          );
          setsandboxPublicClient(
            sandKeys[0].additionalProperties.bypassClientCredentials
          );
        }
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  //   deleting oath keys by key mapping code
  const deleteOauthKeysbyAppco = async (appco: string, kmco: string) => {
    try {
      setLoading(true);
      const response = await APIServices.deleteOauthKeysforApplication(
        appco,
        kmco
      );
      if (response.statusCode === 200) {
        toast({
          description: "Application keys successfully deleted",
          status: "success",
          duration: 3000,
        });
        router.reload();
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "Failed to delete keys";
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const getAllKeyManagers = async () => {
    try {
      setLoading(true);
      const response = await APIServices.getAllKeyManagers();
      if (response.statusCode === 200) {
        setDefaultKeyManager(
          response.data.list.find(
            (item: any) => item.type.toLowerCase() == "default"
          )
        );
      } else {
        throw new Error("Failed to fetch application details");
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch application details";
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  //   This is to generate application keys
  const generateApplicationOauthKeys = async (appCo: string) => {
    try {
      setLoading(true);
      const data: GenerateAppOauthKeys = {
        keyType: view,
        grantTypesToBeSupported:
          view === "PRODUCTION" ? selectedGrants : sandBoxselectedGrants,
        callbackUrl: "",
        additionalProperties: {
          application_access_token_expiry_time:
            view === "PRODUCTION"
              ? appTokenExpiryTime
              : sandboxappTokenExpiryTime,
          user_access_token_expiry_time:
            view === "PRODUCTION"
              ? userAccessTokenExpiryTime
              : sandboxuserAccessTokenExpiryTime,
          refresh_token_expiry_time:
            view === "PRODUCTION"
              ? refreshTokenExpiryTime
              : sandboxrefreshTokenExpiryTime,
          id_token_expiry_time:
            view === "PRODUCTION"
              ? idTokenExpiryTime
              : sandboxidTokenExpiryTime,
          pkceMandatory: view === "PRODUCTION" ? pkce : sandboxpkce,
          pkceSupportPlain: view === "PRODUCTION" ? pckcePlain : sandboxpkce,
          bypassClientCredentials:
            view === "PRODUCTION" ? publicClient : sandboxpublicClient,
        },
        keyManager: defaultKeyManager.id,
        validityTime: 3600,
        scopes: ["default"],
      };

      console.log(data);
      const response = await APIServices.generataOauthKeysforApplication(
        appCo,
        data
      );
      if (response.statusCode === 200) {
        // router.reload();
        toast({
          description: "Application keys successfully generated",
          status: "success",
          duration: 3000,
        });
        fetchOauthKeysbyAppco(appCo as string);
        console.log(response);
      } else {
        throw new Error("Failed to fetch application details");
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch application details";
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  //   This is to edit information on the application keys , be it test or prod env......needs to be completed , awaiting api modification
  const editApplicationOauthKeys = async (appCo: string, kmco: string) => {
    try {
      setLoading(true);
      const data: editOauthDto = {
        keyType: view,
        supportedGrantTypes:
          view === "PRODUCTION" ? selectedGrants : sandBoxselectedGrants,
        callbackUrl: "",
        additionalProperties: {
          application_access_token_expiry_time:
            view === "PRODUCTION"
              ? appTokenExpiryTime
              : sandboxappTokenExpiryTime,
          user_access_token_expiry_time:
            view === "PRODUCTION"
              ? userAccessTokenExpiryTime
              : sandboxuserAccessTokenExpiryTime,
          refresh_token_expiry_time:
            view === "PRODUCTION"
              ? refreshTokenExpiryTime
              : sandboxrefreshTokenExpiryTime,
          id_token_expiry_time:
            view === "PRODUCTION"
              ? idTokenExpiryTime
              : sandboxidTokenExpiryTime,
          pkceMandatory: view === "PRODUCTION" ? pkce : sandboxpkce,
          pkceSupportPlain: view === "PRODUCTION" ? pckcePlain : sandboxpkce,
          bypassClientCredentials:
            view === "PRODUCTION" ? publicClient : sandboxpublicClient,
        },
        keyManager: defaultKeyManager.name,
        keyState: "",
        mode: "",
      };

      console.log(data);
      const response = await APIServices.editOauthKeysforApplication(
        appCo,
        kmco,
        data
      );
      if (response.statusCode === 200) {
        // router.reload();
        toast({
          description: "Application keys successfully updated",
          status: "success",
          duration: 3000,
        });
        fetchOauthKeysbyAppco(appCo as string);
        console.log(response);
      } else {
        throw new Error("Failed to fetch application details");
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch application details";
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  //   This needs to be integrated , api provided and semi integrated, kindly complete
  const generateAccessToken = async (appCo: string, kmco: string) => {
    try {
      setLoading(true);
      const data: GenerateAccessToken = {
        consumerSecret:
          view === "PRODUCTION"
            ? productionApplicationKeys[0].consumerSecret
            : sandboxApplicationKeys[0].consumerSecret,
        validityPeriod: 3600,

        revokeToken: null,
        scopes: [],
        additionalProperties: {
          application_access_token_expiry_time:
            view === "PRODUCTION"
              ? appTokenExpiryTime
              : sandboxappTokenExpiryTime,
          user_access_token_expiry_time:
            view === "PRODUCTION"
              ? userAccessTokenExpiryTime
              : sandboxuserAccessTokenExpiryTime,
          refresh_token_expiry_time:
            view === "PRODUCTION"
              ? refreshTokenExpiryTime
              : sandboxrefreshTokenExpiryTime,
          id_token_expiry_time:
            view === "PRODUCTION"
              ? idTokenExpiryTime
              : sandboxidTokenExpiryTime,
          pkceMandatory: view === "PRODUCTION" ? pkce : sandboxpkce,
          pkceSupportPlain: view === "PRODUCTION" ? pckcePlain : sandboxpkce,
          bypassClientCredentials:
            view === "PRODUCTION" ? publicClient : sandboxpublicClient,
        },
      };

      console.log(data);
      const response = await APIServices.generateAccessTokenforApplication(
        appCo,
        kmco,
        data
      );
      if (response.statusCode === 200) {
        // router.reload();
        setAccessToken(response.data.accessToken);
        setValidity(response.data.validityTime);
        onOpen();
        toast({
          description: "Application keys successfully generated",
          status: "success",
          duration: 3000,
        });
        fetchOauthKeysbyAppco(appCo as string);
        console.log(response);
      } else {
        throw new Error("Failed to fetch application details");
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch application details";
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGrantSelect = (grant: string) => {
    const spreadedGrants = [...selectedGrants];
    if (spreadedGrants.includes(grant)) {
      setSelectedGrants(spreadedGrants.filter((item) => item !== grant));
    } else {
      spreadedGrants.push(grant);
      setSelectedGrants(spreadedGrants);
    }
  };
  const handleSandboxGrantSelect = (grant: string) => {
    const spreadedGrants = [...selectedGrants];
    if (spreadedGrants.includes(grant)) {
      setSelectedGrants(spreadedGrants.filter((item) => item !== grant));
    } else {
      spreadedGrants.push(grant);
      setSelectedGrants(spreadedGrants);
    }
  };

  return (
    <WeaverLayout>
      <Navbar title={`${currentApplication?.name}`} />
      {/* Fix the breadcrumbs before commiting. Use the commented code in api_manager.tsx as a guide */}
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`Subscription Details`}
      />

      <div className="border rounded-xl p-4 mx-4 my-6 min-h-[80dvh] text-dark-txt"></div>
    </WeaverLayout>
  );
}

/* Frame 1321315714 */

/* Auto layout */
/*
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: flex-start;
align-content: flex-start;
padding: 0px;
gap: 16px 34px;

width: 432px;
height: 144px;
*/

/* Inside auto layout 
flex: none;
order: 1;
flex-grow: 0;*/
