import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs, Button } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Switch,
  Checkbox,
  useDisclosure,
} from "@chakra-ui/react";
import { GiPadlock } from "react-icons/gi";
import AddEndpointModal from "@/components/modals/addEndpointModal";
import AddTagModal from "@/components/modals/addTagModal";
const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false, // Disable server-side rendering for this component
});
import "swagger-ui-react/swagger-ui.css";
import { ImockEndpoint } from "./modules";
import { IRevision } from "@/models/api.model";
import APIServices from "@/services/api_services/api_service";

const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

export type ImockTag = {
  name: string;
  id: number;
  endpoints: ImockEndpoint[];
};
const tags: ImockTag[] = [
  {
    name: "Pets",
    id: 1,
    endpoints: [
      {
        id: 1,
        method: "POST",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
        id: 2,
        method: "PUT",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
        id: 3,
        method: "GET",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
        id: 4,
        method: "DELETE",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
    ],
  },
  {
    name: "Store",
    id: 2,
    endpoints: [
      {
        id: 5,
        method: "POST",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },

      {
        id: 6,
        method: "GET",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
        id: 7,
        method: "DELETE",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
    ],
  },
  {
    name: "User",
    id: 3,
    endpoints: [
      {
        id: 8,
        method: "POST",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
        id: 9,
        method: "PUT",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
        id: 10,
        method: "GET",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
    ],
  },
];
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default function ApiModulesTests() {
  const { api, setApi } = useApi();
  const router = useRouter();
  const { apiCode } = router.query;
  const [view, setView] = useState<string>("info");
  const [selectedTag, setSelectedTag] = useState<ImockTag>();
  const [swagger, setSwagger] = useState<any>();
  const [deployedrevisions, setDeployedRevisions] = useState<IRevision[]>([]);
  const [revisions, setRevisions] = useState<IRevision[]>([]);
  const [generatedToken, setGenratedToken] = useState<string>("");
  const [validity, setValidity] = useState<number>(0);
  const [isgenerating, setIsGenerating] = useState<boolean>(false);
  const [swaggerConfig, setSwaggerConfig] = useState<any>({});
  const { loading, setLoading, setSidebar, setApiErrorMessage } =
    useOnboarding();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTagOpen,
    onOpen: onTagOpen,
    onClose: onTagClose,
  } = useDisclosure();

  useEffect(() => {
    // Update Swagger configuration whenever generatedToken changes
    setSwaggerConfig({
      url:
        deployedrevisions.length > 0
          ? `${BASE_URL}/api-manager/api/v1/weaver/api/get-trimmed-revision-swagger-definition?rco=${deployedrevisions[0]?.revisionCode}`
          : `${BASE_URL}/api-manager/api/v1/weaver/api/get-trimmed-api-swagger-definition?aco=${apiCode}`,

      requestInterceptor: (request: any) => {
        request.headers["Authorization"] = `Bearer ${generatedToken}`;
        console.log(generatedToken, "tokenn");
        return request;
      },
    });
    console.log(generatedToken, "outsideS");
  }, [generatedToken, deployedrevisions, apiCode]);
  const getApi = async (aco: string) => {
    try {
      const res = await APIServices.getSingleApi(aco);
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
  const generateToken = async (aco: string) => {
    setIsGenerating(true);
    try {
      const res = await APIServices.generateTokenWeaver(aco);
      if (res.statusCode === 200) {
        setIsGenerating(false);
        setGenratedToken(res.data.apikey);
        const hrs = res.data.validityTime / 3600;
        setValidity(Math.ceil(hrs));
      }
      setIsGenerating(false);
    } catch (error: any) {
      setIsGenerating(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  const getApiRevisions = async (aco: string) => {
    try {
      const res = await APIServices.getApiRevisions(aco);
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
  useEffect(() => {
    if (apiCode) {
      generateToken(apiCode as string);
      getApiRevisions(apiCode as string);
      getDeployedApiRevisions(apiCode as string);
    }
  }, [apiCode]);

  return (
    <WebberLayout>
      <Navbar title={`${api?.name}`} />
      <BreadCrumbs
        // breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${api?.name}-Module`}
      />
      <div className="flex flex-col h-screen md:flex-row gap-3 p-5 justify-between">
        {/* <div className="w-full md:w-[20%] h-full flex flex-col gap-2">
          <div className="w-full text-mid-grey items-center border-bottom-[1px] border-light-grey py-2 flex justify-between">
            <p className="">API Tags</p>
            <MdAdd className="cursor-pointer" onClick={onTagOpen} />
          </div>
          <div className="w-full bg-light-grey rounded text-mid-grey flex flex-col gap-1">
            {tags.map((item, index) => (
              <div
                className={`px-3 py-1 flex hover:bg-[#F8F8F8] ${
                  view === item.name ? "bg-[#F8F8F8]" : "bg-transparent"
                } items-center gap-2 cursor-pointer`}
                key={index}
                onClick={() => {
                  setView(item.name);
                  setSelectedTag(item);
                }}
              >
                {view === item.name ? <FaChevronDown /> : <FaChevronRight />}
                <p className="text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        </div> */}
        <div className="w-full  h-full overflow-y-scroll  flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className=" flex flex-col gap-3 w-[50%]">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">Access Token</p>
                <textarea
                  value={generatedToken}
                  name="token"
                  id="token"
                  onChange={(e) => setGenratedToken(e.target.value)}
                  rows={5}
                  className="border p-2 border-mid-grey rounded-lg"
                />
              </div>
              {generatedToken !== "" && (
                <p className="text-sm text-success">
                  valid for {validity} hours
                </p>
              )}

              <Button
                type="fit"
                text="Generate Key"
                onClick={() => {
                  generateToken(apiCode as string);
                }}
                loading={isgenerating}
              />
            </div>
            {deployedrevisions.length < 1 ? (
              <p className="">
                You need to deploy your api first before testing it out{" "}
              </p>
            ) : (
              <SwaggerUI
                // url={
                //   deployedrevisions.length > 0
                //     ? `${BASE_URL}/api-manager/api/v1/weaver/api/get-trimmed-revision-swagger-definition?rco=${deployedrevisions[0]?.revisionCode}`
                //     : `${BASE_URL}/api-manager/api/v1/weaver/api/get-trimmed-api-swagger-definition?aco=${apiCode}`
                //   // "https://raw.githubusercontent.com/quaddss52/portfoliomain/main/public/documents/output-onlineyamltools.txt?token=GHSAT0AAAAAACTRVRCEBHU5XH4LBF5XFNIEZV3K3UQ"
                // }
                // requestInterceptor={(request) => {
                //   // Add your authorization token here
                //   request.headers["Authorization"] = `Bearer ${generatedToken}`;

                //   return request;
                // }}
                {...swaggerConfig}
                // key={generatedToken}
              />
            )}
          </div>
        </div>
      </div>
      {/* <AddEndpointModal isOpen={isOpen} onClose={onClose} />
      <AddTagModal isOpen={isTagOpen} onClose={onTagClose} /> */}
    </WebberLayout>
  );
}
