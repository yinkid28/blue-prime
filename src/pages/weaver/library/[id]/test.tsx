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
const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export type ImockEndpoint = {
  method: string;
  url: string;
  description: string;
};
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
        method: "POST",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
        method: "PUT",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
        method: "GET",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
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
        method: "POST",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },

      {
        method: "GET",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
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
        method: "POST",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
        method: "PUT",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
      {
        method: "GET",
        url: "/pet/ {petID}/uploadImage",
        description: "uploads an image",
      },
    ],
  },
];
export default function WeaverTests() {
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
    <WeaverLayout>
      <Navbar title={`${api?.title}`} />
      <BreadCrumbs
        // breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${api?.title}-Test`}
      />
      <div className="flex flex-col h-screen md:flex-row gap-3 p-5 justify-between">
        <div className="w-full md:w-[20%] h-full flex flex-col gap-2">
          <div className="w-full text-mid-grey items-center border-bottom-[1px] border-light-grey py-2 flex justify-between">
            <p className="">API Tags</p>
            {/* <MdAdd className="cursor-pointer" onClick={onTagOpen} /> */}
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
        <div className="w-full md:w-[80%] h-full overflow-y-scroll  flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />
          </div>
        </div>
      </div>
      <AddEndpointModal isOpen={isOpen} onClose={onClose} />
      <AddTagModal isOpen={isTagOpen} onClose={onTagClose} />
    </WeaverLayout>
  );
}
