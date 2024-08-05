import Navbar from "@/components/Layout/Nav/navbar";
import { GoQuestion } from "react-icons/go";
import { BreadCrumbs, Button } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { FileType } from "@/models/apidiscovery.model";
import APIServices from "@/services/api_services/api_service";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Radio,
  RadioGroup,
  Spinner,
  Switch,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import CreatableSelect from "react-select/creatable";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IApi } from "@/models/api.model";
import { StylesConfig } from "react-select";
import { configData } from "../../../../../../config";

const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function ApiRuntime() {
  const { api, setApi } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [corsConfig, setCorsConfig] = useState<boolean>(false);
  const [allowAllOrigins, setAllowallOrigins] = useState<boolean>(false);
  const [allowCredentials, setAllowCredentials] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const { apiCode } = router.query;
  const [view, setView] = useState<string>("info");
  const [authorization, setAuthorization] = useState<string>("Authorization");
  const [file, setFile] = useState<any>(null);
  const [keyM, setKeyM] = useState<string>("1");
  const [keyMValue, setKeyMValue] = useState<string[]>(["all"]);
  const [securityScheme, setSecurityScheme] = useState<string[]>([]);
  const hiddenFileInputTwo = useRef<HTMLInputElement>(null);
  const [apiMethods, setApiMethods] = useState<any[]>([]);
  const [apiMethodsArr, setApiMethodsArr] = useState<any>([]);
  const [apiHeaders, setApiHeaders] = useState<any[]>([]);
  const [apiHeadersArr, setApiHeadersArr] = useState<any>([]);
  const [Throughput, setThroughput] = useState<string>("");
  const [prodTp, setProdTp] = useState<number>(0);
  const [sandTP, setSandTp] = useState<number>(0);
  const { loading, setLoading, setApiErrorMessage } = useOnboarding();
  const colourStyles: any = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "white",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      outline: "none",
      ":focus": {
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
      },
    }),

    multiValue: (styles: any, { data }: any) => {
      return {
        ...styles,
        backgroundColor: "#cccccc",
        padding: "5px",
        borderRadius: 9999,
        color: "black",
      };
    },
    // multiValueLabel: (styles, { data }) => ({
    //   ...styles,
    //   color: data.color,
    // }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: "black",
      backgroundColor: "#33333390",
      borderRadius: 9999,
      ":hover": {
        backgroundColor: "#33333370",
        borderRadius: "12px",
        color: "white",
      },
    }),
  };
  const getApi = async (aco: string) => {
    try {
      const res = await APIServices.getSingleApi(aco);
      console.log(res);
      if (res.statusCode === 200) {
        setApi(res.data);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const handleKeyManager = (keyM: string) => {
    if (keyM === "1") {
      setKeyMValue(["all"]);
    } else {
      setKeyMValue([""]);
    }
  };
  const updateApi = async (aco: string) => {
    setIsLoading(true);

    if (api) {
      const { apiCode, customerCode, ...restApiProps } = api;
      const data = {
        ...restApiProps,
        authorizationHeader: authorization,
        keyManagers: keyMValue,
        securityScheme,
        maxTps:
          Throughput === "1"
            ? null
            : {
                production: prodTp,
                sandbox: sandTP,
              },
        corsConfiguration: {
          corsConfigurationEnabled: corsConfig,
          accessControlAllowOrigins: allowAllOrigins ? ["*"] : [],
          accessControlAllowCredentials: allowCredentials,
          accessControlAllowHeaders: Array.from(
            apiHeadersArr,
            (item: any) => item.value
          ),
          accessControlAllowMethods: Array.from(
            apiMethodsArr,
            (item: any) => item.value
          ),
        },
      };
      try {
        const res = await APIServices.updateApi(data, aco);

        if (res.statusCode === 200) {
          setIsLoading(false);
          toast({
            title: "Update Api",
            description: "API successfully Updated",
            duration: 3000,
            status: "success",
            position: "bottom-right",
          });
          // getApi(apiCode as string);
          // router.reload();
        }
      } catch (error: any) {
        setIsLoading(false);
        const errorMessage = error?.response?.data?.message;
        setApiErrorMessage(errorMessage, "error");
      }
    }
  };
  useEffect(() => {
    if (apiCode) {
      getApi(apiCode as string);
    }
    setLoading(false);
  }, [apiCode]);
  const createMultiOptions = (arr: any[]) => {
    return Array.from(arr, (item) => {
      return { label: item, value: item };
    });
  };
  const handleCheckboxSelection = (value: string, arr: string[]) => {
    if (arr.includes(value)) {
      return arr.filter((item) => item !== value);
    } else {
      const newArr = [...arr];
      newArr.push(value);
      return newArr;
    }
  };
  useEffect(() => {
    if (api) {
      if (api?.corsConfiguration?.accessControlAllowMethods.length > 0) {
        const array = createMultiOptions(
          api?.corsConfiguration?.accessControlAllowMethods as string[]
        );
        setApiMethods(array);
      } else {
        const array = createMultiOptions(configData.requestMethods);
        setApiMethods(array);
      }

      if (api?.corsConfiguration?.accessControlAllowHeaders.length > 0) {
        const array2 = createMultiOptions(
          api?.corsConfiguration?.accessControlAllowHeaders as string[]
        );
        setApiHeaders(array2);
      } else {
        const array2 = createMultiOptions(configData.requestHeaders);
        setApiHeaders(array2);
      }
      setAllowCredentials(api.corsConfiguration.accessControlAllowCredentials);
      setCorsConfig(api.corsConfiguration.corsConfigurationEnabled);
      setSecurityScheme(api.securityScheme);
      setAuthorization(api.authorizationHeader as string);
      if (api.corsConfiguration.accessControlAllowOrigins.includes("*")) {
        setAllowallOrigins(true);
      }
      if (api.maxTps === undefined || api.maxTps === null) {
        setThroughput("1");
      } else {
        setThroughput("2");
        setProdTp(api.maxTps.production);
        setSandTp(api.maxTps.sandbox);
      }
    }
  }, [api]);
  useEffect(() => {
    handleKeyManager(keyM);
  }, [keyM]);

  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.name}`} />
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.name}-Runtime`}
        />
        <div className="p-5 flex flex-col w-full md:flex-row gap-3">
          <div className="border border-light-grey w-full rounded-lg p-5 flex flex-col gap-3">
            <p className=" text-dark-grey"> Response</p>
            <Accordion allowToggle>
              <AccordionItem className="shadow-md bg-white" border={"none"}>
                <AccordionButton className="flex w-full justify-between">
                  <p className="text-xs text-dark-grey font-semibold">
                    {" "}
                    Transport Level Security
                  </p>

                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <div className="flex gap-2 flex-col md:flex-row">
                    <Checkbox
                      value={"http"}
                      defaultChecked={api?.transport.includes("http")}
                    >
                      HTTP
                    </Checkbox>
                    <Checkbox
                      value={"https"}
                      defaultChecked={api?.transport.includes("https")}
                    >
                      HTTPS
                    </Checkbox>
                    <Checkbox value={"SSL"}>SSL</Checkbox>
                  </div>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                className="shadow-md my-4 bg-white"
                border={"none"}
              >
                <AccordionButton className="flex w-full justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="text-xs text-dark-grey font-semibold">
                      {" "}
                      Application Level Security
                    </p>
                    {/* <Tooltip label="This option determines the type of security that will be used to secure this API. An API can be secured with either OAuth2/Basic/ApiKey or it can be secured with all of them. If OAuth2 option is selected, relevant API will require a valid OAuth2 token for successful invocation.">
                      <GoQuestion className="text-primary" />
                    </Tooltip> */}
                  </div>

                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 flex-col md:flex-row">
                      <Checkbox
                        value={"oauth2"}
                        defaultChecked={api?.securityScheme.includes("oauth2")}
                        onChange={(e) => {
                          setSecurityScheme(
                            handleCheckboxSelection(
                              e.target.value,
                              securityScheme
                            )
                          );
                        }}
                      >
                        OAuth2
                      </Checkbox>
                      <Checkbox
                        value={"basic_auth"}
                        defaultChecked={api?.securityScheme.includes(
                          "basic_auth"
                        )}
                        onChange={(e) => {
                          setSecurityScheme(
                            handleCheckboxSelection(
                              e.target.value,
                              securityScheme
                            )
                          );
                        }}
                      >
                        Basic
                      </Checkbox>
                      <Checkbox
                        value={"oauth_basic_auth_api_key_mandatory"}
                        defaultChecked={api?.securityScheme.includes(
                          "oauth_basic_auth_api_key_mandatory"
                        )}
                        onChange={(e) => {
                          setSecurityScheme(
                            handleCheckboxSelection(
                              e.target.value,
                              securityScheme
                            )
                          );
                        }}
                      >
                        API Key
                      </Checkbox>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-dark-grey font-semibold">
                        {" "}
                        Key Manager Configuration
                      </p>
                      <RadioGroup onChange={setKeyM} value={keyM}>
                        <div className="flex flex-col md:flex-row gap-2">
                          <Radio value="1">Allow All</Radio>
                          <Radio value="2" disabled>
                            Allow Selected
                          </Radio>
                        </div>
                      </RadioGroup>
                      {/* {keyM === "2"}  Do Somethings */}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-semibold">
                        Authorization Header
                      </p>
                      <input
                        name="auth"
                        id="auth"
                        value={authorization}
                        onChange={(e) => setAuthorization(e.target.value)}
                        className="p-2 rounded-lg w-full border border-light-grey"
                      />
                    </div>
                  </div>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                className="shadow-md my-4 bg-white"
                border={"none"}
              >
                <AccordionButton className="flex w-full justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="text-xs text-dark-grey font-semibold">
                      {" "}
                      CORS Configuration
                    </p>
                    <Switch
                      size={"sm"}
                      onChange={() => setCorsConfig(!corsConfig)}
                      defaultChecked={corsConfig}
                    />
                  </div>

                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  {corsConfig && (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <p className="text-xs text-dark-grey font-semibold">
                          {" "}
                          Access Control Allow Origins
                        </p>
                        <Checkbox
                          spacing={2}
                          onChange={() => setAllowallOrigins(!allowAllOrigins)}
                          defaultChecked={allowAllOrigins}
                        >
                          Allow All Origins
                        </Checkbox>
                        {allowAllOrigins === false && (
                          <CreatableSelect isMulti styles={colourStyles} />
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-xs text-dark-grey font-semibold">
                          {" "}
                          Access Control Allow Headers
                        </p>

                        <CreatableSelect
                          isMulti
                          options={apiHeaders}
                          defaultValue={apiHeaders}
                          onChange={setApiHeadersArr}
                          styles={colourStyles}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-xs text-dark-grey font-semibold">
                          {" "}
                          Access Control Allow Methods
                        </p>

                        <CreatableSelect
                          isMulti
                          options={apiMethods}
                          defaultValue={apiMethods}
                          onChange={setApiMethodsArr}
                          styles={colourStyles}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Checkbox
                          spacing={2}
                          onChange={() =>
                            setAllowCredentials(!allowCredentials)
                          }
                          defaultChecked={allowCredentials}
                        >
                          Access Control Allow Credentials
                        </Checkbox>
                      </div>
                    </div>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            {/* <div className="flex gap-2 items-center">
              <p className="text-xs text-dark-grey"> Schema Validation</p>
              <Switch size={"sm"} />
            </div> */}
          </div>
          <div className="border border-light-grey w-full rounded-lg p-5 flex flex-col gap-3">
            <p className=" text-dark-grey"> Backend</p>
            <p className="text-xs text-dark-grey">
              {" "}
              Maximum Backend Throughput
            </p>
            <RadioGroup
              onChange={(e) => {
                setThroughput(e);
              }}
              value={Throughput}
            >
              <div className="flex flex-col md:flex-row gap-2">
                <Radio value="1">Unlimited</Radio>
                <Radio value="2">Custom</Radio>
              </div>
            </RadioGroup>
            {Throughput === "2" && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold">Production Max TP</p>
                  <input
                    name="throughput"
                    type="number"
                    id="throughput"
                    value={prodTp}
                    onChange={(e) => setProdTp(parseInt(e.target.value))}
                    className="p-2 rounded-lg w-full border border-light-grey"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold">Sandbox Max TP</p>
                  <input
                    name="throughput"
                    id="throughput"
                    type="number"
                    value={sandTP}
                    onChange={(e) => setSandTp(parseInt(e.target.value))}
                    className="p-2 rounded-lg w-full border border-light-grey"
                  />
                </div>
              </div>
            )}
            <p className="text-sm text-dark-grey font-semibold"> Endpoint</p>

            <div className="flex gap-2 items-center">
              <p className="text-xs font-bold text-dark-grey">
                {" "}
                Production Endpoint
              </p>
              <p className="text-xs  text-dark-grey">
                https://loacalhost:8494/pg/sample/opinions
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-xs font-bold text-dark-grey">
                {" "}
                Sandbox Endpoint
              </p>
              <p className="text-xs  text-dark-grey">
                https://loacalhost:8494/pg/sample/opinions
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full justify-end gap-2 md:flex-row flex-col-reverse">
          <button className="border-primaryFade border rounded-lg w-fit px-5 py-2 text-primary">
            Reset
          </button>
          <Button
            text="Save"
            onClick={() => {
              updateApi(apiCode as string);
            }}
            loading={isLoading}
            type="fit"
          />
        </div>
      </WebberLayout>
    </>
  );
}
