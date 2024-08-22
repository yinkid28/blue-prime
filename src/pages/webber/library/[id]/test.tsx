import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbItems, BreadCrumbs } from "@/components/utils";
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
import { BiErrorCircle } from "react-icons/bi";
const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

const breadCrumbs: BreadCrumbItems[] = [
  {
    breadCrumbText: "Library",
    breadCrumbPath: "/webber/library",
  },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function WeaverTests() {
  const { api } = useApi();
  const router = useRouter();
  const { id } = router.query;
  const [view, setView] = useState<string>("info");
  const { setLoading, setSidebar } = useOnboarding();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTagOpen,
    onOpen: onTagOpen,
    onClose: onTagClose,
  } = useDisclosure();
  useEffect(() => {
    setLoading(false);
    setSidebar("apiProgressWeaver");
  }, []);

  return (
    <WeaverLayout>
      <Navbar title={`${api?.name}`} />
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${api?.name}-Test`}
      />
      <div className="flex flex-col h-screen md:flex-row gap-3 p-5 justify-between">
        <div className="w-full md:w-[80%] h-full overflow-y-scroll  flex flex-col gap-2">
          <div className="w-full flex items-center justify-between">
            {/* Notice or access token */}
            <div className="">
              <div className="bg-white rounded-lg shadow-md flex flex-col p-3 gap-3">
                <div className="flex items-center gap-2">
                  <BiErrorCircle className="text-primary" />{" "}
                  <p className="text-sm text-mid-grey">
                    You need an access token to try the API. Please log in and
                    subscribe to the API to generate an access token. If you
                    already have an access token, please provide it below.
                  </p>
                </div>
              </div>
              <div className=""></div>
            </div>
            {/* Test Security */}
            <div className=""></div>
          </div>
          <div className="flex flex-col gap-2">
            <SwaggerUI
              url={
                `${BASE_URL}/api-manager/api/v1/apim-api/get-trimmed-api-swagger-definition?aco=${id}`
                // "https://raw.githubusercontent.com/quaddss52/portfoliomain/main/public/documents/output-onlineyamltools.txt?token=GHSAT0AAAAAACTRVRCEBHU5XH4LBF5XFNIEZV3K3UQ"
              }
            />
          </div>
        </div>
      </div>
      {/* <AddEndpointModal isOpen={isOpen} onClose={onClose} />
      <AddTagModal isOpen={isTagOpen} onClose={onTagClose} /> */}
    </WeaverLayout>
  );
}
