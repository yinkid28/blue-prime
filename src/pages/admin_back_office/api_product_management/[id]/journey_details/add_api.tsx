import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import {
  BreadCrumbItems,
  BreadCrumbs,
  Button,
  SearchBar,
} from "@/components/utils";
import dynamic from "next/dynamic";
import { useApi } from "@/context/ApiDiscoveryContext";
import CustomerJourneyCard from "@/components/Admin/CustomerJourneyCard";
import { ImockEndpoint } from "@/pages/onboarding/weaver/api_details/[id]/modules";
import { ImockTag } from "@/pages/onboarding/weaver/api_details/[id]/test";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Checkbox,
} from "@chakra-ui/react";
import IndividualPoolBreakdown from "@/components/Admin/IndividualPoolBreakdown";
import { IMockPool } from "./[journey]";
import { FiChevronsRight } from "react-icons/fi";

const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});

const breadCrumbs: BreadCrumbItems[] = [
  {
    breadCrumbText: "API Product Management",
    breadCrumbPath: "/admin_back_office/api_product_management",
  },
];
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

const pool: IMockPool[] = [
  {
    name: "Seagate API",
    description: "Analyzes User Behaviour",
    tags: tags,
  },
  {
    name: "Migo",
    description: "Analyzes User Behaviour",
    tags: tags,
  },
  {
    name: "Paystack",
    description: "Analyzes User Behaviour",
    tags: tags,
  },
  {
    name: "NFTco",
    description: "Analyzes User Behaviour",
    tags: tags,
  },
];

export default function AddApiToPool() {
  const [apiPool, setApiPool] = useState<IMockPool[]>(pool);
  const [selectedApi, setSelectedApi] = useState<IMockPool>(pool[0]);
  const [selectedEndpoints, setSelectedEndpoints] = useState<ImockEndpoint[]>(
    []
  );
  const [finalApis, setFinalApis] = useState<IMockPool[]>([]);

  const router = useRouter();
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  const { apiProduct } = useApi();

  useEffect(() => {
    console.log(selectedEndpoints, "selec");
  }, [selectedEndpoints]);

  const handleSort = (
    selectedApi: ImockTag,
    selectedEndpoints: ImockEndpoint
  ) => {
    // return an object of aelectedAPI with name
  };
  return (
    <AdminLayout>
      <AdminNavbar title={apiProduct?.title as string} />
      {/* Remember to fix breadcrumbs */}
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={apiProduct?.title as string}
      />

      <div className="p-5 flex flex-col gap-5">
        <p className="font-semibold">Add API</p>
        <div className="grid gap-3 grid-cols-[20%_1fr_20%]">
          <div className="flex flex-col gap-3 h-full">
            <p className="text-mid-grey font-semibold text-[14px]">
              API Library
            </p>
            <div className="w-full bg-lightest-grey flex flex-col gap-3 border-t-[1px] h-full border-light-grey p-2">
              <SearchBar />
              <Accordion allowToggle>
                {apiPool.map((item, index) => (
                  <AccordionItem
                    key={index}
                    onClick={() => {
                      setSelectedApi(item);
                      setSelectedEndpoints([]);
                    }}
                  >
                    <AccordionButton>
                      <div className="flex gap-2 items-center">
                        <AccordionIcon />
                        <p className="text-dark-grey">{item.name}</p>
                      </div>
                    </AccordionButton>
                    <AccordionPanel>
                      <div className="flex flex-col gap-3">
                        {item.tags.map((tag, index) => (
                          <p className="text-mid-grey" key={index}>
                            {tag.name}
                          </p>
                        ))}
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-mid-grey font-semibold text-[14px]">
              API Content
            </p>
            <div className="w-full border-t-[1px] border-light-grey flex flex-col gap-2">
              <div className="p-2 flex justify-between items-center">
                <p className="text-sm text-primary">
                  {selectedEndpoints.length} Endpoints Selected
                </p>
                <FiChevronsRight className="text-mid-grey" />
              </div>
              <div className="h-[70vh] overflow-scroll">
                <div className="w-full p-4 bg-lightest-grey rounded-t-xl flex items-center gap-3">
                  <Checkbox
                    onChange={() => {
                      if (selectedEndpoints.length < 1) {
                        setSelectedEndpoints([]);
                        let allEndpoints: ImockEndpoint[] = [];
                        selectedApi.tags.forEach((tag) => {
                          allEndpoints.push(...tag.endpoints);
                        });
                        setSelectedApi(selectedApi);
                        setSelectedEndpoints(allEndpoints);
                      } else {
                        setSelectedEndpoints([]);
                      }
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <p className="">{selectedApi.name}</p>
                    <p className="text-sm text-mid-grey">
                      {selectedApi.description}
                    </p>
                  </div>
                </div>
                {selectedApi.tags.map((item, index) => (
                  <div className="flex flex-col gap-2 px-3" key={index}>
                    <p className="font-semibold text-mid-grey">{item.name}</p>
                    <div className="flex flex-col gap-2 ">
                      {item?.endpoints.map((item, index) => (
                        <div
                          className="w-full flex items-center border bg-white p-2 rounded-lg gap-2 "
                          key={index}
                        >
                          <Checkbox
                            defaultChecked={selectedEndpoints.includes(item)}
                            onChange={() => {
                              let currentEndpoints = [...selectedEndpoints];

                              if (currentEndpoints.includes(item)) {
                                const filtered = currentEndpoints.filter(
                                  (endpoint) => endpoint.id != item.id
                                );
                                setSelectedEndpoints(filtered);
                              } else {
                                currentEndpoints = [...currentEndpoints, item];
                                setSelectedEndpoints(currentEndpoints);
                              }
                            }}
                          />
                          <div className="flex items-center gap-2">
                            <button
                              className={`${
                                item.method === "POST"
                                  ? "bg-success"
                                  : item.method === "PUT"
                                  ? "bg-warning"
                                  : item.method === "GET"
                                  ? "bg-info"
                                  : "bg-error"
                              } w-fit h-fit px-5 py-2 text-white rounded-lg`}
                            >
                              {item.method}
                            </button>
                            <div className="flex items-start flex-col gap-1">
                              <p className="text-sm font-semibold text-mid-grey">
                                {item.url}
                              </p>
                              <p className="text-xs font-semibold text-light-grey">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-mid-grey font-semibold text-[14px]">
              API Product
            </p>
            <div className="w-full border-t-[1px] border-light-grey "></div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
