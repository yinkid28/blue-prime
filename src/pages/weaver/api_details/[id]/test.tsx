import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs } from "@/components/utils";
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

  const { loading, setLoading, setSidebar, setApiErrorMessage } =
    useOnboarding();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTagOpen,
    onOpen: onTagOpen,
    onClose: onTagClose,
  } = useDisclosure();
  // useEffect(() => {
  //   setLoading(false);
  //   setSelectedTag(tags[0]);
  //   setView(tags[0].name);
  // }, []);
  // useEffect(() => {
  //   // setLoading(false);
  //   if (apiCode) {
  //     getApi(apiCode as string);
  //     getApiRevisions(apiCode as string);
  //     getDeployedApiRevisions(apiCode as string);
  //     // getApiSwagger(apiCode as string);
  //     setSidebar("apiProgress");
  //   }
  // }, [apiCode]);
  // useEffect(() => {
  //   if (deployedrevisions.length > 0) {
  //     getRevisionSwagger(deployedrevisions[0]?.revisionCode);
  //   } else {
  //     getApiSwagger(apiCode as string);
  //   }
  // }, [deployedrevisions, apiCode]);

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
  const getApiSwagger = async (aco: string) => {
    try {
      const res = await APIServices.getApiSwaggerDefition(aco);
      console.log(res);
      if (res.statusCode === 200) {
        setSwagger(res.data);
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
  const getRevisionSwagger = async (aco: string) => {
    try {
      const res = await APIServices.getRevisionSwaggerDefition(aco);
      console.log(res);
      if (res.statusCode === 200) {
        setSwagger(res.data);
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
            <SwaggerUI
              url={
                deployedrevisions.length > 0
                  ? `${BASE_URL}/api-manager/api/v1/apim-api/get-trimmed-revision-swagger-definition?rco=${deployedrevisions[0]?.revisionCode}`
                  : `${BASE_URL}/api-manager/api/v1/apim-api/get-trimmed-api-swagger-definition?aco=${apiCode}`
                // "https://raw.githubusercontent.com/quaddss52/portfoliomain/main/public/documents/output-onlineyamltools.txt?token=GHSAT0AAAAAACTRVRCEBHU5XH4LBF5XFNIEZV3K3UQ"
              }
            />
          </div>
        </div>
      </div>
      {/* <AddEndpointModal isOpen={isOpen} onClose={onClose} />
      <AddTagModal isOpen={isTagOpen} onClose={onTagClose} /> */}
    </WebberLayout>
  );
}
