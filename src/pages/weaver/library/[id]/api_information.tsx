import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbItems, BreadCrumbs } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  ApiInformationView,
  DocumentationView,
} from "../../../../components/Weaver/apiInformationComponents";

// remember to use static generation here but for now we will use context to get current api
const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

export default function ApiOverview() {
  const { api } = useApi();
  const router = useRouter();
  const { loading, setLoading, setSidebar } = useOnboarding();
  useEffect(() => {
    setLoading(false);
    setSidebar("apiProgressWeaver");
  }, []);
  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Library",
      breadCrumbPath: "/weaver/library",
    },
  ];

  const [apiInfoView, setApiInfoView] = useState<string>("api-information");

  return (
    <>
      <WeaverLayout>
        <Navbar title={`${api?.title}`} />
        {/* Fix the breadcrumbs before commiting. Use the commented code in api_manager.tsx as a guide */}
        <BreadCrumbs
          breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.title}-API Information`}
        />
        {/* CONTENT */}
        <div className="mx-4 my-6">
          {/* VIEW CONTROLLERS */}
          <div className="flex gap-2 rounded mb-4">
            <div
              className={`border py-2 px-4 text-sm rounded-lg text-mid-grey cursor-pointer ${
                apiInfoView === "api-information" &&
                "text-primary border-primary"
              }`}
              onClick={() => setApiInfoView("api-information")}
            >
              API Information
            </div>
            <div
              className={`border py-2 px-4 text-sm rounded-lg text-mid-grey cursor-pointer ${
                apiInfoView === "documentation" && "text-primary border-primary"
              }`}
              onClick={() => setApiInfoView("documentation")}
            >
              Documentation
            </div>
          </div>

          {/* API INFORMATION VIEW */}
          {apiInfoView === "api-information" && ApiInformationView()}
          {apiInfoView === "documentation" && DocumentationView()}
        </div>
      </WeaverLayout>
    </>
  );
}
