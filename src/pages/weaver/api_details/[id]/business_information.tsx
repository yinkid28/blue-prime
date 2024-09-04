import Navbar from "@/components/Layout/Nav/navbar";

import { BreadCrumbs, Button } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { BusinessInformation, IPolicy } from "@/models/api.model";
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
  Skeleton,
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
import { FaBusinessTime } from "react-icons/fa";
import { IoIosGitNetwork } from "react-icons/io";
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
export default function ApiBusinessInformation() {
  const { api, setApi } = useApi();
  const router = useRouter();
  const { apiCode } = router.query;
  const cancelRef = React.useRef();
  const toast = useToast();
  const [prodData, setProdData] = useState<any[]>([]);
  const [businessOwner, setBusinessOwner] = useState<string>("");
  const [businessOwnerEmail, setBusinessOwnerEmail] = useState<string>("");
  const [technicalOwner, setTechnicalOwner] = useState<string>("");
  const [technicalOwnerEmail, setTechnicalOwnerEmail] = useState<string>("");
  const [policies, setPolicies] = useState<IPolicy[]>([]);
  const [selectedpolicie, setSelectedPolicies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [view, setView] = useState<string>("Business Information");
  const { onClose, onOpen, isOpen } = useDisclosure();

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

  const updateApi = async (aco: string) => {
    setIsLoading(true);
    if (api) {
      const { apiCode, customerCode, ...restApiProps } = api;
      const businessInformation: BusinessInformation = {
        businessOwner,
        businessOwnerEmail,
        technicalOwner,
        technicalOwnerEmail,
      };
      const data = {
        ...restApiProps,
        businessInformation,
        policies: selectedpolicie,
      };
      try {
        const res = await APIServices.updateApi(data, aco);

        if (res.statusCode === 200) {
          setIsLoading(false);
          toast({
            title: "Update Api",
            description: "Api successfully updated, ensure you deploy a new revision before you test again",
            duration: 3000,
            status: "success",
            position: "bottom-right",
          });
          getApi(apiCode as string);
          // router.reload();
        }
      } catch (error: any) {
        setIsLoading(false);
        const errorMessage = error?.response?.data?.message;
        setApiErrorMessage(errorMessage, "error");
      }
    }
  };
  const getApi = async (aco: string) => {
    try {
      const res = await APIServices.getSingleApi(aco);
      if (res.statusCode === 200) {
        setApi(res.data);
        setBusinessOwner(res.data.businessInformation.businessOwner);
        setTechnicalOwner(res.data.businessInformation.technicalOwner);
        setBusinessOwnerEmail(res.data.businessInformation.businessOwnerEmail);
        setTechnicalOwnerEmail(
          res.data.businessInformation.technicalOwnerEmail
        );
      }
      setSelectedPolicies(res.data.policies);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const getOutofTheBoxPolicies = async (policyLevel: string) => {
    try {
      const res = await APIServices.getOutofTheBoxPolicies(policyLevel, 0, 25);
      if (res.statusCode === 200) {
        setPolicies(res.data.list);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  useEffect(() => {
    if (apiCode) {
      getApi(apiCode as string);
      getOutofTheBoxPolicies("subscription");
    }
  }, [apiCode]);

  const handleSelectedPolicies = (policy: string) => {
    if (selectedpolicie.includes(policy)) {
      setSelectedPolicies(selectedpolicie.filter((pol) => pol !== policy));
    } else {
      const existingPols = [...selectedpolicie];
      existingPols.push(policy);
      setSelectedPolicies(existingPols);
    }
  };

  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.name}`} />
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.name}-Portal Configurations-${view}`}
        />
        <div className="p-5 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            {" "}
            <div
              className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                view === "Business Information"
                  ? "text-primary border-primary"
                  : "text-mid-grey border-mid-grey"
              }  bg-transparent border-[1px]`}
              onClick={() => {
                setView("Business Information");
              }}
            >
              <p>Business Information</p>
            </div>
            <div
              className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                view === "Throttling Policies"
                  ? "text-primary border-primary"
                  : "text-mid-grey border-mid-grey"
              }  bg-transparent border-[1px]`}
              onClick={() => {
                setView("Throttling Policies");
              }}
            >
              <p>Throttling Policies</p>
            </div>
          </div>
          {view === "Business Information" ? (
            <div className="p-5 flex w-full gap-3 border border-light-grey rounded-lg">
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FaBusinessTime className="text-primary" />

                  <p className="font-semibold ">Business Information</p>
                </div>
                <p className="font-semibold text-xs">
                  Business Information of the API
                </p>
              </div>
              <div className="w-full flex flex-col gap-3">
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">Business Owner</p>
                  <input
                    type="text"
                    name="businessOwner"
                    placeholder="Business Owner "
                    className="outline-none bg-transparent"
                    value={businessOwner}
                    onChange={(e) => setBusinessOwner(e.target.value)}
                  />
                </div>
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">Business Owner Email</p>
                  <input
                    type="email"
                    name="businessOwnerEmail"
                    placeholder="Business Owner Email"
                    className="outline-none bg-transparent"
                    value={businessOwnerEmail}
                    onChange={(e) => setBusinessOwnerEmail(e.target.value)}
                  />
                </div>
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">Technical Owner</p>
                  <input
                    type="text"
                    name="technicalOwner"
                    placeholder="technicalOwner"
                    className="outline-none bg-transparent"
                    value={technicalOwner}
                    onChange={(e) => setTechnicalOwner(e.target.value)}
                  />
                </div>
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">Business Owner</p>
                  <input
                    type="email"
                    name="technicalOwnerEmail"
                    placeholder="technicalOwnerEmail"
                    className="outline-none bg-transparent"
                    value={technicalOwnerEmail}
                    onChange={(e) => setTechnicalOwnerEmail(e.target.value)}
                  />
                </div>
                <div className="flex items-center w-full justify-end gap-2 md:flex-row flex-col-reverse">
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
          ) : (
            <div className="p-5 flex w-full gap-3 border border-light-grey rounded-lg">
              <div className="w-[30%] flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <IoIosGitNetwork className="text-primary" />
                  <p className="font-semibold ">Throttling Policies</p>
                </div>
                <p className="font-semibold text-xs">
                  Attach business plans to API
                </p>
              </div>
              <div className="flex flex-col gap-3 w-[70%]">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {policies.length === 0
                    ? [1, 2, 3, 4, 5].map((item, index) => (
                        <Skeleton key={index} width={"100%"} height={5} />
                      ))
                    : policies.map((item, index) => (
                        <div
                          className="flex items-center w-full gap-2"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            value={item.name}
                            defaultChecked={selectedpolicie.includes(item.name)}
                            onChange={(e) => {
                              handleSelectedPolicies(e.target.value);
                            }}
                          />{" "}
                          <p className="text-sm">
                            {item.name} : {item.description}
                          </p>
                        </div>
                      ))}
                </div>
                <div className="flex items-center w-full justify-end gap-2 md:flex-row flex-col-reverse">
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
          )}
        </div>
      </WebberLayout>
    </>
  );
}
