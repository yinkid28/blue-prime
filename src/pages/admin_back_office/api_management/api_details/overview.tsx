import EndpointReportCard from "@/components/Admin/EndpointReportCard";
import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import { BreadCrumbItems, BreadCrumbs } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
// import { ImockEndpoint } from "@/pages/onboarding/weaver/api_details/[id]/modules";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
} from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { ImockTag } from "@/pages/weaver/api_details/[id]/test";
import { ImockEndpoint } from "@/pages/weaver/api_details/[id]/modules";
// import { ImockTag } from "@/pages/onboarding/weaver/api_details/[id]/test";
const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});
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
export default function BackofficeApiOverview() {
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  const { api } = useApi();
  const [view, setView] = useState<string>("endpoint");
  const [selectedTag, setSelectedTag] = useState<ImockTag>(tags[0]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ImockEndpoint>();
  const [tagview, setTagView] = useState<string>(tags[0].name);

  const breadcrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "API Management",
      breadCrumbPath: "/admin_back_office/api_management",
    },
  ];
  useEffect(() => {
    setSidebar("backOfficeApi");
    setLoading(false);
  }, []);

  return (
    <AdminLayout>
      <AdminNavbar title="API Management" />
      <BreadCrumbs
        breadCrumbActiveItem={api?.name as string}
        breadCrumbItems={breadcrumbs}
      />
      <div className="p-5 flex flex-col gap-5 ">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <button
              className={`w-fit md:px-5 md:py-2 px-3 py-2 border-[1px] rounded-lg ${
                view === "endpoint"
                  ? "text-primary border-primary"
                  : "text-mid-grey border-mid-grey"
              } ease-in-out duration-700`}
              onClick={() => setView("endpoint")}
            >
              Endpoints
            </button>
            <button
              className={`w-fit md:px-5 md:py-2 px-3 py-2 border-[1px] rounded-lg ${
                view === "report"
                  ? "text-primary border-primary"
                  : "text-mid-grey border-mid-grey"
              } ease-in-out duration-700`}
              onClick={() => setView("report")}
            >
              Report
            </button>
          </div>

          <Menu>
            <MenuButton>
              <FaEllipsisV className="font-thin text-mid-grey" />
            </MenuButton>
            <MenuList>
              <MenuItem>Approve Publishing</MenuItem>
              <MenuItem>Deny Publishing</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="p-5 flex flex-col border-light-grey rounded-lg border gap-3">
          {view === "report" && (
            <div className="flex w-full justify-between flex-col-reverse md:flex-row">
              <div className="w-full md:w-[70%] border border-primary rounded-lg p-2 flex flex-col gap-2">
                <p className="text-sm text-primary">Comment</p>
                <textarea
                  className="bg-none outline-none border-none"
                  placeholder="Must be able to collate all  files and sort according to specified paramet|"
                ></textarea>
              </div>
              <div className="w-full md:w-[30%] flex md:justify-end justify-center">
                <CircularProgress
                  value={80}
                  size="100px"
                  thickness="4px"
                  color="blue"
                >
                  <CircularProgressLabel>80%</CircularProgressLabel>
                </CircularProgress>
              </div>
            </div>
          )}
          <div className=" flex flex-col md:flex-row gap-3    justify-between">
            <div className="w-full md:w-[20%] ">
              {selectedEndpoint !== undefined && view === "endpoint" ? (
                <div className="flex flex-col gap-1 w-full h-full">
                  <div
                    className="w-full text-mid-grey font-semibold items-center border-bottom-[1px] border-light-grey gap-2 flex cursor-pointer"
                    onClick={() => setSelectedEndpoint(undefined)}
                  >
                    <FaChevronLeft />
                    <p>Back</p>
                  </div>
                  <div className="w-full h-full border-t-[1px] border-mid-grey bg-light-grey rounded text-mid-grey flex flex-col gap-1 p-3">
                    <p className="text-primary">
                      {selectedEndpoint.criteria?.name}
                    </p>
                    <p className="text-sm">
                      {selectedEndpoint.criteria?.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1 w-full h-full">
                  <div className="w-full text-mid-grey text-[14px] font-semibold items-center border-bottom-[1px] border-light-grey  flex justify-between">
                    <p className="">API Tags</p>
                  </div>
                  <div className="w-full h-full bg-light-grey rounded text-mid-grey flex flex-col gap-1">
                    {tags.map((item, index) => (
                      <div
                        className={`px-3 py-1 flex hover:bg-[#F8F8F8] ${
                          tagview === item.name
                            ? "bg-[#F8F8F8]"
                            : "bg-transparent"
                        } items-center gap-2 cursor-pointer`}
                        key={index}
                        onClick={() => {
                          setTagView(item.name);
                          setSelectedTag(item);
                        }}
                      >
                        {tagview === item.name ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                        <p className="text-sm">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full md:w-[80%] ">
              <p className="text-mid-grey mb-2 font-semibold">
                {selectedTag.name}
              </p>
              {view === "endpoint" && (
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex flex-col gap-2">
                    <Accordion allowToggle>
                      {selectedTag?.endpoints.map((item, index) => (
                        <AccordionItem key={index}>
                          <div className="flex items-center p-2 justify-between">
                            <div className="flex items-center  gap-2">
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
                            <div className="w-fit">
                              <AccordionButton
                                onClick={() => setSelectedEndpoint(item)}
                                _hover={{
                                  background: "none",
                                }}
                              >
                                <div className="w-full flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="w-fit h-fit rounded-full px-3 py-1 bg-criteriaBg text-criteria">
                                      <p className="text-sm">
                                        {item.criteria?.name}
                                      </p>
                                    </div>
                                    <AccordionIcon />
                                  </div>
                                </div>
                              </AccordionButton>
                            </div>
                          </div>

                          <AccordionPanel pb={4}>
                            <div className="flex w-full flex-col items-center gap-2">
                              <div className="flex w-full flex-col gap-2">
                                <p className="text-mid-grey text-sm font-semibold">
                                  Description
                                </p>
                                <div className="flex flex-col gap-2 md:flex-row">
                                  <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                                    <p className="text-xs text-dark-grey">
                                      Description
                                    </p>
                                    <textarea
                                      placeholder="Describe your Endpoint"
                                      name="endpointDescription"
                                      id="endpointDescription"
                                      rows={5}
                                    ></textarea>
                                  </div>
                                  <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                                    <p className="text-xs text-dark-grey">
                                      Summary
                                    </p>
                                    <textarea
                                      placeholder="Describe your Endpoint"
                                      name="endpointDescription"
                                      id="endpointDescription"
                                      rows={5}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                              <div className="flex w-full flex-col gap-2">
                                <p className="text-mid-grey text-sm font-semibold">
                                  Operation Governance
                                </p>
                                <div className="flex items-center gap-2">
                                  <p className="text-mid-grey text-sm">
                                    Security
                                  </p>
                                  <Switch size="sm" />
                                </div>
                                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                                  <p className="text-xs text-dark-grey">
                                    {" "}
                                    Rate limiting policy
                                  </p>
                                  <select
                                    name="rateLimit"
                                    id="rateLimit"
                                    className="border-none outline-none"
                                  >
                                    <option value="">Choose a policy</option>
                                    <option value="entertainment">
                                      finance
                                    </option>
                                  </select>
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-2">
                                  <div className="md:w-[80%] w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                                    <p className="text-xs text-dark-grey">
                                      {" "}
                                      Rate limiting policy
                                    </p>
                                    <select
                                      name="rateLimit"
                                      id="rateLimit"
                                      className="border-none outline-none"
                                    >
                                      <option value="">Choose a policy</option>
                                      <option value="entertainment">
                                        finance
                                      </option>
                                    </select>
                                  </div>
                                  <button className="border-primaryFade px-3 font-semibold py-1 rounded-lg w-fit flex items-center gap-2 text-primary border">
                                    <MdAdd />
                                    <p className="text-sm">Add New Scope</p>
                                  </button>
                                </div>
                              </div>
                              <div className="flex w-full flex-col gap-2">
                                <p className="text-mid-grey text-sm font-semibold">
                                  Parameters
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                                    <p className="text-xs text-dark-grey">
                                      {" "}
                                      Parameter Type
                                    </p>
                                    <select
                                      name="rateLimit"
                                      id="rateLimit"
                                      className="border-none outline-none"
                                    >
                                      <option value="">Choose a policy</option>
                                      <option value="entertainment">
                                        finance
                                      </option>
                                    </select>
                                  </div>
                                  <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                                    <p className="text-xs text-dark-grey">
                                      {" "}
                                      Parameter Name
                                    </p>
                                    <input
                                      type="text"
                                      className="outline-none border-none"
                                    />
                                  </div>
                                  <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                                    <p className="text-xs text-dark-grey">
                                      {" "}
                                      Data Type
                                    </p>
                                    <select
                                      name="rateLimit"
                                      id="rateLimit"
                                      className="border-none outline-none"
                                    >
                                      <option value="">
                                        Choose a dataType
                                      </option>
                                      <option value="entertainment">
                                        Number
                                      </option>
                                    </select>
                                  </div>
                                  <div className="">
                                    <Checkbox>Required</Checkbox>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              )}
              {view === "report" && (
                <div className="grid grid-cols-1 gap-2">
                  {selectedTag.endpoints.map((item, index) => (
                    <EndpointReportCard key={index} endpoint={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
