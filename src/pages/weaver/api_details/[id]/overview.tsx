import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs, toTitleCase } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { FaCheck, FaCheckCircle } from "react-icons/fa";

import DeleteAPIModal from "@/components/modals/deleteApi";
import { IApi, IRevision } from "@/models/api.model";
import {
  ApiConfigurationCard,
  ApiDetailsCard,
  ApiEndpointCard,
} from "@/components/Webber/CreateAPI/apiProgress/overviewComponents";
import APIServices from "@/services/api_services/api_service";

// remember to use static generation here but for now we will use context to get current api
const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function ApiOverview() {
  const { api, setApi } = useApi();
  const router = useRouter();
  const { apiCode } = router.query;
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [revisions, setRevisions] = useState<IRevision[]>([]);
  const [deployedrevisions, setDeployedRevisions] = useState<IRevision[]>([]);

  const { loading, setLoading, setSidebar, setApiErrorMessage } =
    useOnboarding();
  useEffect(() => {
    // setLoading(false);
    if (apiCode) {
      getApi(apiCode as string);
      getApiRevisions(apiCode as string);
      getDeployedApiRevisions(apiCode as string);
      setSidebar("apiProgress");
    }
  }, [apiCode]);

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

  const handleEndpointConfigCheck = (api: IApi) => {
    if (api.endpointConfig) {
      return true;
    } else {
      return false;
    }
  };
  const getApiRevisions = async (aco: string) => {
    try {
      const res = await APIServices.getApiRevisions(aco);
      console.log(res);
      if (res.statusCode === 200) {
        setRevisions(res.data.list);
        // setLifeStatus(res.data.lifeCycleStatus.toLowerCase());
        // handleLifeCycle(res.data.lifeCycleStatus);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const getDeployedApiRevisions = async (aco: string) => {
    try {
      const res = await APIServices.getApiRevisions(aco, true);
      console.log(res);
      if (res.statusCode === 200) {
        setDeployedRevisions(res.data.list);
        // setLifeStatus(res.data.lifeCycleStatus.toLowerCase());
        // handleLifeCycle(res.data.lifeCycleStatus);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.name}`} />
        <div className="w-full pr-5 flex flex-col md:flex-row justify-between">
          <BreadCrumbs
            // breadCrumbItems={breadCrumbs}
            breadCrumbActiveItem={`${api?.name}-Overview`}
          />
          <button
            className="w-fit h-fit rounded-lg px-4 py-1 bg-error-bg font-semibold text-error"
            onClick={onOpen}
          >
            Delete
          </button>
        </div>
        <div className="p-5 flex gap-5">
          <div className="hidden md:w-[25%] md:flex flex-col gap-2 ">
            <div className="p-2  border-[1px] border-light-grey rounded-lg h-fit flex flex-col gap-3">
              <p className="text-sm font-semibold text-mid-grey">Stages</p>
              <Accordion allowToggle>
                <div className="flex flex-col gap-4">
                  <AccordionItem
                    border={"none"}
                    _hover={{ background: "none" }}
                  >
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton w={"100%"} display={"flex"} gap={5}>
                          <div
                            className={`${
                              isExpanded
                                ? "text-white bg-primary"
                                : "bg-transparent text-primary border-[1px] border-primary"
                            } w-[100px] text-center rounded-full px-5 py-1`}
                          >
                            <p>Develop</p>
                          </div>
                          <FaCheckCircle className="text-success text-xl" />
                        </AccordionButton>

                        <AccordionPanel p={4}>
                          <div className="flex flex-col pl-8 gap-3">
                            <div className="flex items-center gap-2">
                              <p
                                className={`${
                                  handleEndpointConfigCheck(api as IApi)
                                    ? "font-bold"
                                    : "font-normal"
                                } text-mid-grey cursor-pointer text-sm`}
                                onClick={() =>
                                  router.push(
                                    `/weaver/api_details/${toTitleCase(
                                      api!.name,
                                      true
                                    )}/endpoints`
                                  )
                                }
                              >
                                Endpoint
                              </p>
                              <FaCheck
                                className={`${
                                  handleEndpointConfigCheck(api as IApi)
                                    ? "text-success"
                                    : "text-mid-grey"
                                }`}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-mid-grey font-bold text-sm">
                                Business Plan
                              </p>
                              <FaCheck className="text-success" />
                            </div>
                          </div>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                  <AccordionItem
                    border={"none"}
                    _hover={{ background: "none" }}
                  >
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton w={"100%"} display={"flex"} gap={5}>
                          <div
                            className={`${
                              isExpanded
                                ? "text-white bg-primary"
                                : "bg-transparent text-primary border-[1px] border-primary"
                            } w-[100px] text-center rounded-full px-5 py-1`}
                          >
                            <p>Deploy</p>
                          </div>
                          <FaCheckCircle
                            className={` text-xl ${
                              deployedrevisions.length > 0
                                ? "text-success"
                                : "text-mid-grey"
                            }`}
                          />
                        </AccordionButton>

                        <AccordionPanel p={4}>
                          <div className="flex flex-col pl-8 gap-3">
                            <div className="flex items-center gap-2">
                              <p className="text-mid-grey text-sm">Deploy</p>
                              <FaCheck
                                className={`  ${
                                  deployedrevisions.length > 0
                                    ? "text-success"
                                    : "text-mid-grey"
                                }`}
                              />
                            </div>
                          </div>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                  <AccordionItem
                    border={"none"}
                    _hover={{ background: "none" }}
                  >
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton w={"100%"} display={"flex"} gap={5}>
                          <div
                            className={`${
                              isExpanded
                                ? "text-white bg-primary"
                                : "bg-transparent text-primary border-[1px] border-primary"
                            } w-[100px] text-center rounded-full px-5 py-1`}
                          >
                            <p>Test</p>
                          </div>
                          <FaCheckCircle
                            className={` text-xl ${
                              deployedrevisions.length > 0
                                ? "text-success"
                                : "text-mid-grey"
                            }`}
                          />
                        </AccordionButton>

                        {/* <AccordionPanel pb={4}>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <p className="text-mid-grey text-sm">Deploy</p>
                              <FaCheck className="text-mid-grey" />
                            </div>
                          </div>
                        </AccordionPanel> */}
                      </>
                    )}
                  </AccordionItem>

                  <AccordionItem
                    border={"none"}
                    _hover={{ background: "none" }}
                  >
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton w={"100%"} display={"flex"} gap={5}>
                          <div
                            className={`${
                              isExpanded
                                ? "text-white bg-primary"
                                : "bg-transparent text-primary border-[1px] border-primary"
                            } w-[100px] text-center rounded-full px-5 py-1`}
                          >
                            <p>Publish</p>
                          </div>
                          <FaCheckCircle className="text-mid-grey text-xl" />
                        </AccordionButton>

                        <AccordionPanel pb={4}>
                          {/* <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <p className="text-mid-grey text-sm">Endpoint</p>
                              <FaCheck className="text-mid-grey" />
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-mid-grey text-sm">
                                Business Plan
                              </p>
                              <FaCheck className="text-mid-grey" />
                            </div>
                          </div> */}
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </div>
              </Accordion>
            </div>
            <div className="p-2  border-[1px] border-light-grey rounded-lg h-fit flex flex-col gap-3">
              <p className="text-sm font-semibold text-mid-grey">Resources</p>
              {api?.operations.map((item, index) => (
                <div className="flex justify-between" key={index}>
                  <div className="w-[30%]">
                    <p className="text-mid-grey text-sm">{item.target}</p>
                  </div>
                  <div className="w-full gap-2 flex flex-wrap items-center">
                    <div
                      className={`${
                        item.verb === "POST"
                          ? "bg-success"
                          : item.verb === "PUT"
                          ? "bg-warning"
                          : item.verb === "GET"
                          ? "bg-info"
                          : "bg-error"
                      } px-3 py-1 rounded text-white text-xs font-semibold`}
                    >
                      <p>{item.verb}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[75%]">
            <ApiDetailsCard />
            <ApiConfigurationCard />
            <ApiEndpointCard />
          </div>
        </div>
        <DeleteAPIModal isOpen={isOpen} onClose={onClose} api={api as IApi} />
      </WebberLayout>
    </>
  );
}
