import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import {
  BreadCrumbItems,
  BreadCrumbs,
  Button,
  SearchBar,
  toTitleCase,
} from "@/components/utils";
import dynamic from "next/dynamic";
import { useApi } from "@/context/ApiDiscoveryContext";
import CustomerJourneyCard from "@/components/Admin/CustomerJourneyCard";
import { ImockEndpoint } from "@/pages/webber/api_details/[id]/modules";
import { ImockTag } from "@/pages/webber/api_details/[id]/test";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import IndividualPoolBreakdown from "@/components/Admin/IndividualPoolBreakdown";

const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});

const breadCrumbs: BreadCrumbItems[] = [
  {
    breadCrumbText: "API Product Management",
    breadCrumbPath: "/admin_back_office/api_product_management",
  },
];

export type IMockPool = {
  name: string;
  description: string;
  tags: ImockTag[];
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
export default function JourneyDetails() {
  const router = useRouter();
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  const { apiProduct } = useApi();

  useEffect(() => {
    setSidebar("ApiProductDetails");
    setLoading(false);
  }, []);
  return (
    <AdminLayout>
      <AdminNavbar title={apiProduct?.title as string} />
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={apiProduct?.title as string}
      />

      <div className="p-5">
        <div className="flex md:flex-row flex-col justify-between mb-4 items-center">
          <div className=" w-full md:w-[60%]">
            <SearchBar />
          </div>
          <Button
            type="fit"
            text="Add API"
            onClick={() => {
              router.push(
                `/admin_back_office/api_product_management/apiProductDetails-${toTitleCase(
                  apiProduct?.title as string
                )}/journey_details/add_api`
              );
            }}
          />
        </div>
        {/* CREATE COMPONENT FOR ACCORDION INSIDE ACCORDION */}

        <Accordion allowToggle>
          <div className="grid grid-cols-1 gap-2">
            {pool.map((item, index) => (
              <AccordionItem key={index} className="bg-light-grey rounded-lg">
                <AccordionButton>
                  <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col text-left gap-2">
                      <p className="text-dark-grey">{item.name}</p>
                      <p className="text-sm text-mid-grey">
                        {item.description}
                      </p>
                    </div>

                    <AccordionIcon />
                  </div>
                </AccordionButton>
                <AccordionPanel>
                  <IndividualPoolBreakdown tags={item.tags} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </div>
    </AdminLayout>
  );
}
