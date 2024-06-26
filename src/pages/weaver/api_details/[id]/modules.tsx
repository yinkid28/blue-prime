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
import { ImockTag } from "./test";

const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export type ImockEndpoint = {
  id: number;
  method: string;
  url: string;
  description: string;
  criteria?: { name: string; description: string };
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
export default function ApiModules() {
  const { api } = useApi();
  const router = useRouter();
  const [view, setView] = useState<string>("info");
  const [selectedTag, setSelectedTag] = useState<ImockTag>();
  const { loading, setLoading } = useOnboarding();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTagOpen,
    onOpen: onTagOpen,
    onClose: onTagClose,
  } = useDisclosure();
  useEffect(() => {
    setLoading(false);
    setSelectedTag(tags[0]);
    setView(tags[0].name);
  }, []);
  return (
    <WebberLayout>
      <Navbar title={`${api?.name}`} />
      <BreadCrumbs
        // breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${api?.name}-Module`}
      />
      <div className="flex flex-col md:flex-row gap-3 p-5 justify-between">
        <div className="w-full md:w-[20%] flex flex-col gap-2">
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
        </div>
        <div className="w-full md:w-[80%] flex flex-col gap-2">
          <div className="py-2 flex items-center justify-end ">
            <button
              className="border-primaryFade px-3 font-semibold py-1 rounded-lg w-fit flex items-center gap-2 text-primary border"
              onClick={onOpen}
            >
              <MdAdd />
              <p className="text-sm">Add Endpoint</p>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <Accordion allowToggle>
              {selectedTag?.endpoints.map((item, index) => (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton>
                      <div className="w-full flex items-center justify-between">
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
                        <div className="flex items-center gap-2">
                          <GiPadlock />
                          <AccordionIcon />
                        </div>
                      </div>
                    </AccordionButton>
                  </h2>
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
                            <p className="text-xs text-dark-grey">Summary</p>
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
                          <p className="text-mid-grey text-sm">Security</p>
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
                            <option value="entertainment">finance</option>
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
                              <option value="entertainment">finance</option>
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
                              <option value="entertainment">finance</option>
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
                            <p className="text-xs text-dark-grey"> Data Type</p>
                            <select
                              name="rateLimit"
                              id="rateLimit"
                              className="border-none outline-none"
                            >
                              <option value="">Choose a dataType</option>
                              <option value="entertainment">Number</option>
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
      </div>
      <AddEndpointModal isOpen={isOpen} onClose={onClose} />
      <AddTagModal isOpen={isTagOpen} onClose={onTagClose} />
    </WebberLayout>
  );
}
