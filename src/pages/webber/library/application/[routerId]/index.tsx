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
import { Spinner, Switch, UseToastOptions, useToast } from "@chakra-ui/react";
import { getFormattedDate } from "@/helper_utils/helpers";
import APIServices from "@/services/api_services/api_service";
import CopyIcon from "../../../../../../public/icons/copyicon";
import {
  editOauthDto,
  GenerateAppOauthKeys,
  IApplication,
  OauthKeys,
} from "@/models/webber.model";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
export default function AppDetails() {
  const { api, setApi, currentApplication } = useApi();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const { appCo } = router.query;
  const { setSidebar, setApiErrorMessage } = useOnboarding();
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
  ];
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
  const generateAccessToken = async (appCo: string) => {
    try {
      setLoading(true);
      const data: GenerateAppOauthKeys = {
        keyType: view,
        grantTypesToBeSupported: selectedGrants,
        callbackUrl: "",
        additionalProperties: {
          application_access_token_expiry_time: appTokenExpiryTime,
          user_access_token_expiry_time: userAccessTokenExpiryTime,
          refresh_token_expiry_time: refreshTokenExpiryTime,
          id_token_expiry_time: idTokenExpiryTime,
          pkceMandatory: pkce,
          pkceSupportPlain: pckcePlain,
          bypassClientCredentials: publicClient,
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
        breadCrumbActiveItem={`${currentApplication?.applicationCode}`}
      />

      <div className="border rounded-xl p-4 mx-4 my-6 min-h-[80dvh] text-dark-txt">
        <div className="flex gap-4 items-center mb-6">
          <p className="font-semibold">{application?.name}</p>
          <Icon icon="fluent:edit-20-regular" className="text-mid-grey" />
          <Icon icon="fluent:delete-24-regular" className="text-mid-grey" />
        </div>

        <div className="flex gap-2 rounded mb-4">
          <div
            onClick={() => setView("PRODUCTION")}
            className={`border py-2 px-4 text-sm rounded-lg text-mid-grey cursor-pointer ${
              view === "PRODUCTION" && "text-primary border-criteria"
            }`}
          >
            Production Keys
          </div>
          <div
            onClick={() => setView("SANDBOX")}
            className={`border py-2 px-4 text-sm rounded-lg text-mid-grey cursor-pointer ${
              view === "SANDBOX" && "text-primary border-criteria"
            }`}
          >
            Test Keys
          </div>
        </div>

        {view === "PRODUCTION" ? (
          <>
            {loading ? (
              <Spinner />
            ) : (
              <>
                {productionApplicationKeys.length > 0 ? (
                  <>
                    <div className="flex gap-4">
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="secret-key"
                          className="text-xs text-dark-grey"
                        >
                          Consumer Secret Key
                        </label>
                        <input
                          type="text"
                          name="secret-key"
                          id="secret-key"
                          // placeholder="Input JSON URL"
                          className="outline-none bg-transparent"
                          disabled
                          value={productionApplicationKeys[0]?.consumerKey}
                          // value={name}
                          // onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="consumer-key"
                          className="text-xs text-dark-grey"
                        >
                          Consumer Key
                        </label>
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type={showKey ? "text" : "password"}
                            id="consumer-key"
                            name="consumer-key"
                            // placeholder="Input JSON URL"
                            className="outline-none bg-transparent w-full"
                            disabled
                            value={productionApplicationKeys[0]?.consumerSecret}
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                          />
                          {showKey ? (
                            <FaEyeSlash
                              className="cursor-pointer"
                              onClick={() => setShowKey(!showKey)}
                            />
                          ) : (
                            <FaEye
                              className="cursor-pointer"
                              onClick={() => setShowKey(!showKey)}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex gap-3 items-center">
                      <button className="mt-4 border-2 border-primaryFade text-sm py-2 px-5 rounded-lg font-semibold text-primary w-fit">
                        Generate Access Token
                      </button>
                      <button
                        onClick={() => {
                          deleteOauthKeysbyAppco(
                            application?.appCode as string,
                            productionApplicationKeys[0]?.keyMappingCode
                          );
                        }}
                        className="mt-4 bg-error-bg text-error text-sm py-2 px-5 rounded-lg font-semibold w-fit"
                      >
                        Remove App Keys
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-mid-grey text-sm">
                      Production Key and Secret have not been generated for this
                      application
                    </p>
                  </>
                )}

                <div className="flex gap-4 mt-6">
                  <div className="border-light-grey border w-full rounded-lg p-4 flex flex-col gap-4">
                    <p className="font-semibold text-mid-grey">
                      Application Configuration
                    </p>

                    {/* grant types */}
                    <p className="capitalize text-dark-grey text-xs">
                      grant types
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-y-4 gap-x-9">
                        {allGrants.map((grant, i) => (
                          <div
                            key={i}
                            className="flex-none flex items-center gap-2 order-1 grow-0"
                          >
                            <input
                              type="checkbox"
                              name={grant.displayName}
                              id={grant.displayName}
                              defaultChecked={selectedGrants.includes(
                                grant.value
                              )}
                              value={grant.value}
                              onChange={(e) =>
                                handleGrantSelect(e.target.value)
                              }
                            />
                            <label
                              className="capitalize whitespace-nowrap"
                              htmlFor={grant.displayName}
                            >
                              {grant.displayName}
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-mid-grey">
                        The application can use the following grant types to
                        generate Access Tokens. Based on the application
                        requirement,you can enable or disable grant types for
                        this application.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex-none flex items-center gap-2 order-1 grow-0">
                        <label
                          className="capitalize whitespace-nowrap"
                          htmlFor="PKCE"
                        >
                          Enable PKCE
                        </label>
                        <Switch onChange={() => setPkce(!pkce)} />
                      </div>
                      <div className="flex-none flex items-center gap-2 order-1 grow-0">
                        <label
                          className="capitalize whitespace-nowrap"
                          htmlFor="PKCE"
                        >
                          Support PKCE Plain text
                        </label>
                        <Switch onChange={() => setPkcePlain(!pckcePlain)} />
                      </div>
                      <div className="flex-none flex items-center gap-2 order-1 grow-0">
                        <label
                          className="capitalize whitespace-nowrap"
                          htmlFor="PKCE"
                        >
                          Public client
                        </label>
                        <Switch
                          onChange={() => setPublicClient(!publicClient)}
                        />
                      </div>
                    </div>
                    <Button
                      type="fit"
                      text={
                        productionApplicationKeys.length > 0
                          ? "Update"
                          : "Generate Keys"
                      }
                      onClick={() => {
                        generateApplicationOauthKeys(appCo as string);
                      }}
                    />
                  </div>

                  <div className="border-light-grey border w-full rounded-lg p-4">
                    <p className="font-semibold text-mid-grey">
                      Key Configuration
                    </p>
                    <div className="flex flex-col gap-4 mt-4 text-sm">
                      <div className="grid grid-cols-[auto_auto_10%]">
                        <p className="font-semibold capitalize text-dark-grey">
                          token endpoint
                        </p>
                        <p className="text-dark-grey">
                          https://localhost:9443/oauth2/token
                        </p>
                        <CopyIcon />
                      </div>
                      <div className="grid grid-cols-[auto_auto_10%]">
                        <p className="font-semibold capitalize text-dark-grey">
                          revoke endpoint
                        </p>
                        <p className="text-dark-grey">
                          https://localhost:9443/oauth2/revoke
                        </p>
                        <CopyIcon />
                      </div>
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="appTokenExpiryTime"
                          className="text-xs text-dark-grey"
                        >
                          Application Access Token Expiry Time
                        </label>
                        <input
                          name="appTokenExpiryTime"
                          id="appTokenExpiryTime"
                          placeholder="3600
                      "
                          type="number"
                          value={appTokenExpiryTime}
                          onChange={(e) =>
                            setAppTokenExpiryTime(e.target.value)
                          }
                        />
                      </div>
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="appTokenExpiryTime"
                          className="text-xs text-dark-grey"
                        >
                          User Access Token Expiry Time
                        </label>
                        <input
                          name="userAccessTokenExpiryTime"
                          id="userAccessTokenExpiryTime"
                          placeholder="3600
                      "
                          type="number"
                          value={userAccessTokenExpiryTime}
                          onChange={(e) =>
                            setUserAccessTokenExpiryTime(e.target.value)
                          }
                        />
                      </div>
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="appTokenExpiryTime"
                          className="text-xs text-dark-grey"
                        >
                          Refresh Token Expiry Time
                        </label>
                        <input
                          name="refreshTokenExpiryTime"
                          id="refreshTokenExpiryTime"
                          placeholder="3600
                      "
                          type="number"
                          value={refreshTokenExpiryTime}
                          onChange={(e) =>
                            setRefreshTokenExpiryTime(e.target.value)
                          }
                        />
                      </div>
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="appTokenExpiryTime"
                          className="text-xs text-dark-grey"
                        >
                          Id Token Expiry Time
                        </label>
                        <input
                          name="idTokenExpiryTime"
                          id="idTokenExpiryTime"
                          placeholder="3600
                      "
                          type="number"
                          value={idTokenExpiryTime}
                          onChange={(e) => setIdTokenExpiryTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : null}
        {view === "SANDBOX" ? (
          <>
            {loading ? (
              <Spinner />
            ) : (
              <>
                {sandboxApplicationKeys.length > 0 ? (
                  <>
                    <div className="flex gap-4">
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="secret-key"
                          className="text-xs text-dark-grey"
                        >
                          Consumer Secret Key
                        </label>
                        <input
                          type="text"
                          name="secret-key"
                          id="secret-key"
                          // placeholder="Input JSON URL"
                          className="outline-none bg-transparent"
                          disabled
                          value={sandboxApplicationKeys[0]?.consumerKey}
                          // value={name}
                          // onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="consumer-key"
                          className="text-xs text-dark-grey"
                        >
                          Consumer Key
                        </label>
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type={showKey ? "text" : "password"}
                            id="consumer-key"
                            name="consumer-key"
                            // placeholder="Input JSON URL"
                            className="outline-none bg-transparent w-full"
                            disabled
                            value={sandboxApplicationKeys[0]?.consumerSecret}
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                          />
                          {showKey ? (
                            <FaEyeSlash
                              className="cursor-pointer"
                              onClick={() => setShowKey(!showKey)}
                            />
                          ) : (
                            <FaEye
                              className="cursor-pointer"
                              onClick={() => setShowKey(!showKey)}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex gap-3 items-center">
                      <button className="mt-4 border-2 border-primaryFade text-sm py-2 px-5 rounded-lg font-semibold text-primary w-fit">
                        Generate Access Token
                      </button>
                      <button
                        onClick={() => {
                          deleteOauthKeysbyAppco(
                            application?.appCode as string,
                            sandboxApplicationKeys[0]?.keyMappingCode
                          );
                        }}
                        className="mt-4 bg-error-bg text-error text-sm py-2 px-5 rounded-lg font-semibold w-fit"
                      >
                        Remove App Keys
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-mid-grey text-sm">
                      text Key and Secret have not been generated for this
                      application
                    </p>
                  </>
                )}

                <div className="flex gap-4 mt-6">
                  <div className="border-light-grey border w-full rounded-lg p-4 flex flex-col gap-4">
                    <p className="font-semibold text-mid-grey">
                      Application Configuration
                    </p>

                    {/* grant types */}
                    <p className="capitalize text-dark-grey text-xs">
                      grant types
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-y-4 gap-x-9">
                        {allGrants.map((grant, i) => (
                          <div
                            key={i}
                            className="flex-none flex items-center gap-2 order-1 grow-0"
                          >
                            <input
                              type="checkbox"
                              name={grant.displayName}
                              id={grant.displayName}
                              defaultChecked={sandBoxselectedGrants.includes(
                                grant.value
                              )}
                              value={grant.value}
                              onChange={(e) =>
                                handleSandboxGrantSelect(e.target.value)
                              }
                            />
                            <label
                              className="capitalize whitespace-nowrap"
                              htmlFor={grant.displayName}
                            >
                              {grant.displayName}
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-mid-grey">
                        The application can use the following grant types to
                        generate Access Tokens. Based on the application
                        requirement,you can enable or disable grant types for
                        this application.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex-none flex items-center gap-2 order-1 grow-0">
                        <label
                          className="capitalize whitespace-nowrap"
                          htmlFor="PKCE"
                        >
                          Enable PKCE
                        </label>
                        <Switch onChange={() => setsandboxPkce(!pkce)} />
                      </div>
                      <div className="flex-none flex items-center gap-2 order-1 grow-0">
                        <label
                          className="capitalize whitespace-nowrap"
                          htmlFor="PKCE"
                        >
                          Support PKCE Plain text
                        </label>
                        <Switch
                          onChange={() => setsandboxPkcePlain(!pckcePlain)}
                        />
                      </div>
                      <div className="flex-none flex items-center gap-2 order-1 grow-0">
                        <label
                          className="capitalize whitespace-nowrap"
                          htmlFor="PKCE"
                        >
                          Public client
                        </label>
                        <Switch
                          onChange={() => setsandboxPublicClient(!publicClient)}
                        />
                      </div>
                    </div>
                    <Button
                      type="fit"
                      text={
                        sandboxApplicationKeys.length > 0
                          ? "Update"
                          : "Generate Keys"
                      }
                      onClick={() => {
                        sandboxApplicationKeys.length < 1
                          ? generateApplicationOauthKeys(appCo as string)
                          : editApplicationOauthKeys(
                              appCo as string,
                              sandboxApplicationKeys[0].keyMappingCode
                            );
                      }}
                    />
                  </div>

                  <div className="border-light-grey border w-full rounded-lg p-4">
                    <p className="font-semibold text-mid-grey">
                      Key Configuration
                    </p>
                    <div className="flex flex-col gap-4 mt-4 text-sm">
                      <div className="grid grid-cols-[auto_auto_10%]">
                        <p className="font-semibold capitalize text-dark-grey">
                          token endpoint
                        </p>
                        <p className="text-dark-grey">
                          https://localhost:9443/oauth2/token
                        </p>
                        <CopyIcon />
                      </div>
                      <div className="grid grid-cols-[auto_auto_10%]">
                        <p className="font-semibold capitalize text-dark-grey">
                          revoke endpoint
                        </p>
                        <p className="text-dark-grey">
                          https://localhost:9443/oauth2/revoke
                        </p>
                        <CopyIcon />
                      </div>
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="appTokenExpiryTime"
                          className="text-xs text-dark-grey"
                        >
                          Application Access Token Expiry Time
                        </label>
                        <input
                          name="appTokenExpiryTime"
                          id="appTokenExpiryTime"
                          placeholder="3600
                      "
                          type="number"
                          value={sandboxappTokenExpiryTime}
                          onChange={(e) =>
                            setsandboxAppTokenExpiryTime(e.target.value)
                          }
                        />
                      </div>
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="appTokenExpiryTime"
                          className="text-xs text-dark-grey"
                        >
                          User Access Token Expiry Time
                        </label>
                        <input
                          name="userAccessTokenExpiryTime"
                          id="userAccessTokenExpiryTime"
                          placeholder="3600
                      "
                          type="number"
                          value={sandboxuserAccessTokenExpiryTime}
                          onChange={(e) =>
                            setsandboxUserAccessTokenExpiryTime(e.target.value)
                          }
                        />
                      </div>
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="appTokenExpiryTime"
                          className="text-xs text-dark-grey"
                        >
                          Refresh Token Expiry Time
                        </label>
                        <input
                          name="refreshTokenExpiryTime"
                          id="refreshTokenExpiryTime"
                          placeholder="3600
                      "
                          type="number"
                          value={sandboxrefreshTokenExpiryTime}
                          onChange={(e) =>
                            setsandboxRefreshTokenExpiryTime(e.target.value)
                          }
                        />
                      </div>
                      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                        <label
                          htmlFor="appTokenExpiryTime"
                          className="text-xs text-dark-grey"
                        >
                          Id Token Expiry Time
                        </label>
                        <input
                          name="idTokenExpiryTime"
                          id="idTokenExpiryTime"
                          placeholder="3600
                      "
                          type="number"
                          value={sandboxidTokenExpiryTime}
                          onChange={(e) =>
                            setsandboxIdTokenExpiryTime(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : null}
      </div>
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
