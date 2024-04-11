import Navbar from "@/components/Layout/Nav/navbar";
import EndpointView from "@/components/apiDiscovery/EndpointsView";
import DocumentationView from "@/components/apiDiscovery/documentation";
import FeedbackView from "@/components/apiDiscovery/feedbackView";
import PriceView from "@/components/apiDiscovery/pricingView";

import { BreadCrumbItems, BreadCrumbs } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ApiLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function ApiProduct() {
  const router = useRouter();
  const { setSidebar, loading, setLoading } = useOnboarding();

  const { id } = router.query;
  const [view, setView] = useState<string>("Endpoint");
  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Dashboard",
      breadCrumbPath: "/api_discovery",
    },
  ];
  useEffect(() => {
    setSidebar("api");
    setLoading(false);
  }, []);
  return (
    <>
      <ApiLayout>
        <Navbar title={id as string} />
        <BreadCrumbs
          breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={id as string}
        />
        <div className="border-t-[1px] border-light-grey p-5">
          <div className="flex  items-center w-full justify-between">
            <div className="hidden md:flex items-center gap-3">
              <div
                className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                  view === "Endpoint"
                    ? "text-primary border-primary"
                    : "text-mid-grey border-mid-grey"
                }  bg-transparent border-[1px]`}
                onClick={() => {
                  setView("Endpoint");
                }}
              >
                <p>Endpoint</p>
              </div>
              <div
                className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                  view === "Documentation"
                    ? "text-primary border-primary "
                    : "text-mid-grey border-mid-grey"
                }  bg-transparent border-[1px]`}
                onClick={() => {
                  setView("Documentation");
                }}
              >
                <p>Documentation</p>
              </div>
              <div
                className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                  view === "Feedback"
                    ? "text-primary border-primary"
                    : "text-mid-grey border-mid-grey"
                }  bg-transparent border-[1px]`}
                onClick={() => {
                  setView("Feedback");
                }}
              >
                <p>Feedbacks & Discussions</p>
              </div>
              <div
                className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                  view === "Pricing"
                    ? "text-primary border-primary"
                    : "text-mid-grey border-mid-grey"
                }  bg-transparent border-[1px]`}
                onClick={() => {
                  setView("Pricing");
                }}
              >
                <p>Pricing</p>
              </div>
            </div>
            <div className="w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 border-[1px] border-mid-grey  rounded-xl  bg-transparent border-[1px]">
              <select className="border-none outline-none">
                <option value="version-1"> Version 1</option>
              </select>
            </div>
          </div>
          <div className="my-5">
            {view === "Endpoint" ? <EndpointView /> : null}
            {view === "Documentation" ? <DocumentationView /> : null}
            {view === "Feedback" ? <FeedbackView /> : null}
            {view === "Pricing" ? <PriceView /> : null}
          </div>
        </div>
      </ApiLayout>
    </>
  );
}
