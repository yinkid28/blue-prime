import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import {
  ApiConfigurationCard,
  ApiDetailsCard,
  ApiEndpointCard,
} from "@/components/Webber/CreateAPI/apiProgress/overviewComponents";

// remember to use static generation here but for now we will use context to get current api
const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function ApiOverview() {
  const { api } = useApi();
  const router = useRouter();
  const { loading, setLoading, setSidebar } = useOnboarding();
  useEffect(() => {
    setLoading(false);
    setSidebar("apiProgress");
  }, []);

  const modules = [
    {
      url: "/pets",
      methods: ["POST", "PUT", "GET", "DELETE"],
    },
    {
      url: "/store",
      methods: ["POST", "PUT", "GET", "DELETE"],
    },
    {
      url: "/users",
      methods: ["POST", "PUT", "GET", "DELETE"],
    },
    {
      url: "/owners",
      methods: ["POST", "PUT", "GET", "DELETE"],
    },
  ];
  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.title}`} />
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.title}-Overview`}
        />
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

                        <AccordionPanel pb={4}>
                          <div className="flex flex-col gap-3">
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
                          <FaCheckCircle className="text-success text-xl" />
                        </AccordionButton>

                        <AccordionPanel pb={4}>
                          <div className="flex flex-col gap-3">
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
                          <FaCheckCircle className="text-success text-xl" />
                        </AccordionButton>

                        <AccordionPanel pb={4}>
                          <div className="flex flex-col gap-3">
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
                            <p>Publish</p>
                          </div>
                          <FaCheckCircle className="text-success text-xl" />
                        </AccordionButton>

                        <AccordionPanel pb={4}>
                          <div className="flex flex-col gap-3">
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
                          </div>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </div>
              </Accordion>
            </div>
            <div className="p-2  border-[1px] border-light-grey rounded-lg h-fit flex flex-col gap-3">
              <p className="text-sm font-semibold text-mid-grey">Modules</p>
              {modules.map((item, index) => (
                <div className="flex justify-between" key={index}>
                  <div className="w-[30%]">
                    <p className="text-mid-grey text-sm">{item.url}</p>
                  </div>
                  <div className="w-full gap-2 flex flex-wrap items-center">
                    {item.methods.map((method, ind) => (
                      <div
                        className={`${
                          method === "POST"
                            ? "bg-success"
                            : method === "PUT"
                            ? "bg-warning"
                            : method === "GET"
                            ? "bg-info"
                            : "bg-error"
                        } px-3 py-1 rounded text-white text-xs font-semibold`}
                        key={ind}
                      >
                        <p>{method}</p>
                      </div>
                    ))}
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
      </WebberLayout>
    </>
  );
}
