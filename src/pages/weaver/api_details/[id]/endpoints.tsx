import Navbar from "@/components/Layout/Nav/navbar";

import { BreadCrumbs, Button } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { FileType } from "@/models/apidiscovery.model";
import APIServices from "@/services/api_services/api_service";
import {
  Accordion,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spinner,
  Switch,
  position,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

type endpoints = {
  endpoint_type?: string;
  template_not_supported: boolean;
  url: string;
};
type endpointConfig = {
  endpoint_type: string;
  failOver: boolean;
  production_endpoints?: endpoints | endpoints[];
  sandbox_endpoints?: endpoints | endpoints[];
  sandbox_failovers?: endpoints[];
  production_failovers?: endpoints[];
  algoCombo?: string;
  sessionManagement?: string;
  sessionTimeOut?: string;
  algoClassName?: string;
};
export default function ApiProgressEndpoints() {
  const { api } = useApi();
  const router = useRouter();
  const { apiCode } = router.query;
  const cancelRef = React.useRef();
  const toast = useToast();
  const [view, setView] = useState<string>("rest");
  const [endpointType, setEndpointType] = useState<string>("HTTP");
  const [prodData, setProdData] = useState<any[]>([]);
  const [sandBoxData, setSandBoxData] = useState<any[]>([]);
  const [sandBoxurl, setSandBoxurl] = useState<string>("");
  const [produrl, setProdurl] = useState<string>("");
  const [prodserverUrl, setProdServerUrl] = useState<string>("");
  const [sandserverUrl, setSandServerUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preView, setPreView] = useState<string>("");
  const { onClose, onOpen, isOpen } = useDisclosure();
  const handleInputChange = (index: number, event: any) => {
    const { name, value } = event.target;
    const inputs = [...prodData];
    inputs[index] = { ...inputs[index], [name]: value };
    return inputs;
    // setProdData(inputs);
  };
  const { loading, setLoading, setApiErrorMessage } = useOnboarding();
  useEffect(() => {
    setLoading(false);
  }, []);
  const addUrl = (
    event: any,
    setter: Dispatch<SetStateAction<any[]>>,
    state: any[],
    text: string
  ) => {
    event.preventDefault();
    setter([...state, { url: text }]);
  };
  const removeUrl = (
    index: number,
    setter: Dispatch<SetStateAction<any[]>>,
    state: any[]
  ) => {
    const inputs = [...state];
    inputs.splice(index, 1);
    setter(inputs);
  };
  const updateApi = async (aco: string) => {
    setIsLoading(true);

    if (api) {
      const { apiCode, customerCode, ...restApiProps } = api;
      let endPointConfigdata: endpointConfig;
      if (endpointType === "failover") {
        const prodFail =
          prodData.length > 0
            ? Array.from(prodData, (item) => {
                if (view === "rest") {
                  return {
                    template_not_supported: false,
                    url: item.url,
                  };
                } else {
                  return {
                    template_not_supported: false,
                    url: item.url,
                    endpoint_type: "address",
                  };
                }
              })
            : null;
        const sandFail =
          sandBoxData.length > 0
            ? Array.from(sandBoxData, (item) => {
                if (view === "rest") {
                  return {
                    template_not_supported: false,
                    url: item.url,
                  };
                } else {
                  return {
                    template_not_supported: false,
                    url: item.url,
                    endpoint_type: "address",
                  };
                }
              })
            : null;
        endPointConfigdata = {
          endpoint_type: endpointType,
          failOver: true,
        };
        if (sandBoxurl !== "" && view === "rest") {
          endPointConfigdata.sandbox_endpoints = {
            template_not_supported: false,
            url: sandBoxurl,
          };
        } else if (sandBoxurl !== "" && view === "soap") {
          endPointConfigdata.sandbox_endpoints = {
            template_not_supported: false,
            url: sandBoxurl,
            endpoint_type: "address",
          };
        }
        if (produrl !== "" && view === "rest") {
          endPointConfigdata.production_endpoints = {
            template_not_supported: false,
            url: produrl,
          };
        } else if (sandBoxurl !== "" && view === "soap") {
          endPointConfigdata.production_endpoints = {
            template_not_supported: false,
            url: produrl,
            endpoint_type: "address",
          };
        }
        if (prodFail !== null) {
          endPointConfigdata.production_failovers = prodFail;
        }

        if (sandFail !== null) {
          endPointConfigdata.sandbox_failovers = sandFail;
        }

        console.log(endPointConfigdata, "config");
        const data = {
          ...restApiProps,
          endpointConfig: endPointConfigdata,
        };
        console.log(data);
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
      } else if (endpointType === "load_balance") {
        const prodEndponts: endpoints[] = [
          { template_not_supported: false, url: produrl },
          ...Array.from(prodData, (item) => {
            if (view === "rest") {
              return {
                template_not_supported: false,
                url: item.url,
              };
            } else {
              return {
                template_not_supported: false,
                url: item.url,
                endpoint_type: "address",
              };
            }
          }),
        ];
        const sandBoxEndpoints: endpoints[] = [
          { template_not_supported: false, url: sandBoxurl },
          ...Array.from(sandBoxData, (item) => {
            if (view === "rest") {
              return {
                template_not_supported: false,
                url: item.url,
              };
            } else {
              return {
                template_not_supported: false,
                url: item.url,
                endpoint_type: "address",
              };
            }
          }),
        ];

        endPointConfigdata = {
          endpoint_type: endpointType,
          failOver: false,
          sessionManagement: "",
          sessionTimeOut: "",
          algoClassName: "",
          algoCombo: "",
        };
        if (sandBoxurl !== "") {
          endPointConfigdata.sandbox_endpoints = sandBoxEndpoints;
        }
        if (produrl !== "") {
          endPointConfigdata.production_endpoints = prodEndponts;
        }
        console.log(endPointConfigdata);

        const data = {
          ...restApiProps,
          endpointConfig: endPointConfigdata,
        };
        console.log(data);
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
      } else {
        endPointConfigdata = {
          endpoint_type: endpointType,
          failOver: false,
        };
        if (sandBoxurl !== "" && view === "rest") {
          endPointConfigdata.sandbox_endpoints = {
            template_not_supported: false,
            url: sandBoxurl,
          };
        } else if (sandBoxurl !== "" && view === "soap") {
          endPointConfigdata.sandbox_endpoints = {
            template_not_supported: false,
            url: sandBoxurl,
            endpoint_type: "address",
          };
        }
        if (produrl !== "" && view === "rest") {
          endPointConfigdata.production_endpoints = {
            template_not_supported: false,
            url: produrl,
          };
        } else if (sandBoxurl !== "" && view === "soap") {
          endPointConfigdata.production_endpoints = {
            template_not_supported: false,
            url: produrl,
            endpoint_type: "address",
          };
        }
        const data = {
          ...restApiProps,
          endpointConfig: endPointConfigdata,
        };
        console.log(data);
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
    }
  };

  const reset = (view: string) => {
    setProdData([]);
    setSandBoxData([]);
    setProdurl("");
    setSandBoxurl("");
    setView(view);
    onClose();
  };

  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.name}`} />
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.name}-Endpoints`}
        />
        <div className="p-5">
          <div className="p-5 flex flex-col w-full gap-3 border border-light-grey rounded-lg">
            <div className="flex flex-col w-full md:flex-row gap-3">
              <div className="w-full rounded-lg p-5 flex flex-col gap-3">
                <p className=" text-dark-grey">Endpoint</p>
                <RadioGroup
                  onChange={(e) => {
                    setPreView(e);
                    onOpen();
                  }}
                  value={view}
                >
                  <div className="flex flex-col gap-3">
                    <Radio value="rest">HTTP/REST Endpoint</Radio>
                    <Radio value="soap">HTTP/SOAP Endpoint</Radio>
                  </div>
                </RadioGroup>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Change Endpoint Type</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <p className="text-sm">
                        Your current endpoint configuration will be lost.
                      </p>
                    </ModalBody>

                    <ModalFooter gap={3}>
                      <button className="font-semibold" onClick={onClose}>
                        {" "}
                        cancel
                      </button>
                      <Button
                        text="Change"
                        onClick={() => {
                          reset(preView);
                        }}
                        loading={isLoading}
                        type="fit"
                      />
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
              <div className="w-full rounded-lg p-5 flex flex-col gap-3">
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">Production Endpoint</p>
                  <input
                    type="text"
                    name="prodendpoint"
                    placeholder="https://loacalhost:8494/pg/sample/opinions"
                    className="outline-none bg-transparent"
                    value={produrl}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setProdData([]);
                        setProdServerUrl("");
                      }
                      setProdurl(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">Sandbox Endpoint</p>
                  <input
                    type="text"
                    name="sandendpoint"
                    placeholder="https://loacalhost:8494/pg/sample/opinions"
                    className="outline-none bg-transparent"
                    value={sandBoxurl}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setSandBoxData([]);
                        setSandServerUrl("");
                      }
                      setSandBoxurl(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">
                    General Endpoint Configuration
                  </p>
                  <select
                    name="apiCat"
                    id="apiCat"
                    className="border-none outline-none"
                  >
                    <option value="">Choose a Configuration</option>
                    {/* <option value="entertainment">Entertainment</option> */}
                  </select>
                </div>
                <div className="bg-light-grey rounded-lg p-1 h-fit ease-in-out duration-500">
                  <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex gap-1 flex-col">
                    <p className="text-sm text-dark-grey font-semibold">
                      Load Balance and Failover Configuration
                    </p>

                    <select
                      name="apiCat"
                      id="apiCat"
                      className="border-none outline-none p-2 rounded-lg"
                      onChange={(e) => {
                        setSandBoxData([]);
                        setProdData([]);
                        setProdServerUrl("");
                        setSandServerUrl("");
                        setEndpointType(e.target.value);
                      }}
                      value={endpointType}
                    >
                      <option value={view === "rest" ? "http" : "address"}>
                        None
                      </option>
                      {produrl === "" && sandBoxurl === "" ? null : (
                        <>
                          <option value="failover">Failover</option>
                          <option value="load_balance">Load Balanced</option>
                        </>
                      )}
                      {/* <option value="entertainment">Entertainment</option> */}
                    </select>
                  </div>
                  {(endpointType === "failover" ||
                    endpointType === "load_balance") && (
                    <div className="flex flex-col gap-3 p-2">
                      {produrl !== "" && (
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-1">
                            <p className="text-xs font-semibold">{`Production ${
                              endpointType === "failover"
                                ? "Failover"
                                : "Loadbalanced"
                            } Endpoints`}</p>
                            <div className="flex w-full flex-row gap-2 items-center">
                              <input
                                type="text"
                                className="p-2 rounded-lg w-[80%]"
                                value={prodserverUrl}
                                onChange={(e) =>
                                  setProdServerUrl(e.target.value)
                                }
                              />
                              <div className="w-[20%]">
                                <Button
                                  text="Add"
                                  onClick={(e) => {
                                    if (prodserverUrl === "") {
                                      toast({
                                        description:
                                          "Add a server url before proceeding",
                                        position: "bottom-right",
                                        status: "warning",
                                        duration: 2000,
                                      });
                                      return;
                                    }
                                    addUrl(
                                      e,
                                      setProdData,
                                      prodData,
                                      prodserverUrl
                                    );

                                    setProdServerUrl("");
                                  }}
                                  type="fit"
                                />
                              </div>
                            </div>{" "}
                            {prodData.map((input, index) => (
                              <div
                                className="flex flex-col  border border-dark-grey rounded-lg p-2 "
                                key={index}
                              >
                                <p className="text-xs font-[700]">
                                  {`Server ${index + 1}`}
                                </p>
                                <div className="flex  gap-2 items-center justify-between  w-full">
                                  <p className="text-sm">{input?.url}</p>
                                  <button
                                    onClick={() =>
                                      removeUrl(index, setProdData, prodData)
                                    }
                                    style={{
                                      background: "none",
                                      border: "none",
                                    }}
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        width="24"
                                        height="24"
                                        rx="12"
                                        fill="#FFE0E5"
                                      />
                                      <path
                                        d="M8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8Z"
                                        fill="#FF7A8C"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {sandBoxurl !== "" && (
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-1">
                            <p className="text-xs font-semibold">{`Sandbox ${
                              endpointType === "failover"
                                ? "Failover"
                                : "Loadbalanced"
                            } Endpoints`}</p>
                            <div className="flex w-full flex-row gap-2 items-center">
                              <input
                                type="text"
                                className="p-2 rounded-lg w-[80%]"
                                value={sandserverUrl}
                                onChange={(e) =>
                                  setSandServerUrl(e.target.value)
                                }
                              />
                              <div className="w-[20%]">
                                <Button
                                  text="Add"
                                  onClick={(e) => {
                                    if (sandserverUrl === "") {
                                      toast({
                                        description:
                                          "Add a server url before proceeding",
                                        position: "bottom-right",
                                        status: "warning",
                                        duration: 2000,
                                      });
                                      return;
                                    }
                                    addUrl(
                                      e,
                                      setSandBoxData,
                                      sandBoxData,
                                      sandserverUrl
                                    );
                                    setSandServerUrl("");
                                  }}
                                  type="fit"
                                />
                              </div>
                            </div>{" "}
                            {sandBoxData.map((input, index) => (
                              <div
                                className="flex flex-col  border border-dark-grey rounded-lg p-2 "
                                key={index}
                              >
                                <p className="text-xs font-[700]">
                                  {`Server ${index + 1}`}
                                </p>
                                <div className="flex  gap-2 items-center justify-between  w-full">
                                  <p className="text-sm">{input?.url}</p>

                                  <button
                                    onClick={() =>
                                      removeUrl(
                                        index,
                                        setSandBoxData,
                                        sandBoxData
                                      )
                                    }
                                    style={{
                                      background: "none",
                                      border: "none",
                                    }}
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        width="24"
                                        height="24"
                                        rx="12"
                                        fill="#FFE0E5"
                                      />
                                      <path
                                        d="M8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8Z"
                                        fill="#FF7A8C"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
          </div>
        </div>
      </WebberLayout>
    </>
  );
}
